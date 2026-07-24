import { prisma } from '@realtime-chat/database';
import { ConversationRequest } from '@realtime-chat/schema';
import { StatusCodes } from 'http-status-codes';
import { conversationUserSelect } from '../lib/db-selects/user.select.js';
import { AppError } from '../lib/exceptions/AppError.js';

export class ConversationService {
    async getConversations(userId: string) {
        const conversations = await prisma.conversation.findMany({
            where: {
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: conversationUserSelect,
                        },
                    },
                },
                messages: {
                    take: 1,
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return conversations.map(({ messages, ...conversation }) => ({
            ...conversation,
            lastMessage: messages[0] ?? null,
        }));
    }

    async getConversationById(conversationId: string, userId: string) {
        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: conversationUserSelect,
                        },
                    },
                },
            },
        });

        if (!conversation) {
            throw new AppError('Conversation not found', StatusCodes.NOT_FOUND);
        }

        return conversation;
    }

    async startConversation(currentUserId: string, data: ConversationRequest) {
        const { isGroup, userIds, name } = data;

        const uniqueUserIds = Array.from(new Set(userIds));

        if (!isGroup && uniqueUserIds.length !== 1) {
            throw new AppError(
                'Direct conversation requires exactly 1 user',
                StatusCodes.BAD_REQUEST
            );
        }

        if (isGroup && uniqueUserIds.length < 2) {
            throw new AppError(
                'Group conversation requires at least 2 users',
                StatusCodes.BAD_REQUEST
            );
        }

        if (uniqueUserIds.includes(currentUserId)) {
            throw new AppError('You cannot add yourself to participants', StatusCodes.BAD_REQUEST);
        }

        const participants = [...uniqueUserIds, currentUserId];

        const existingUsers = await prisma.user.findMany({
            where: {
                id: {
                    in: participants,
                },
            },
            select: {
                id: true,
            },
        });

        if (existingUsers.length !== participants.length) {
            throw new AppError('User not found', StatusCodes.NOT_FOUND);
        }

        if (!isGroup) {
            const otherUserId = uniqueUserIds[0];

            const existingConversation = await prisma.conversation.findFirst({
                where: {
                    isGroup: false,
                    AND: [
                        {
                            participants: {
                                some: { userId: currentUserId },
                            },
                        },
                        {
                            participants: {
                                some: { userId: otherUserId },
                            },
                        },
                    ],
                },
                include: {
                    participants: {
                        include: {
                            user: {
                                select: conversationUserSelect,
                            },
                        },
                    },
                },
            });

            if (existingConversation) return existingConversation;
        }

        return prisma.conversation.create({
            data: {
                isGroup,
                name: isGroup ? name : null,
                participants: {
                    create: participants.map((id) => ({
                        userId: id,
                    })),
                },
            },
            include: {
                participants: {
                    include: {
                        user: {
                            select: conversationUserSelect,
                        },
                    },
                },
            },
        });
    }
}

export const conversationService = new ConversationService();
