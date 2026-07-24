import { prisma } from '@realtime-chat/database';
import { MessageFull } from '@realtime-chat/schema';
import { StatusCodes } from 'http-status-codes';
import { conversationUserSelect } from '../lib/db-selects/user.select.js';
import { AppError } from '../lib/exceptions/AppError.js';
import { getIO } from '../socket.js';

class MessageService {
    async createMessage(senderId: string, conversationId: string, content: string) {
        const accessibleConversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                participants: {
                    some: {
                        userId: senderId,
                    },
                },
            },
            select: {
                id: true,
            },
        });

        if (!accessibleConversation) {
            throw new AppError('Forbidden', StatusCodes.FORBIDDEN);
        }

        const message = await prisma.$transaction(async (tx) => {
            const createdMessage = await tx.message.create({
                data: {
                    conversationId,
                    senderId,
                    content,
                },
                include: {
                    sender: {
                        select: conversationUserSelect,
                    },
                },
            });

            await tx.conversation.update({
                where: {
                    id: conversationId,
                },
                data: {
                    updatedAt: new Date(),
                },
            });

            return createdMessage;
        });

        // temp types fix
        const messageForClient: MessageFull = {
            ...message,
            createdAt: message.createdAt.toISOString(),
            sender: {
                ...message.sender,
                name: message.sender.name ?? undefined,
                avatar: message.sender.avatar ?? undefined,
                bio: message.sender.bio ?? undefined,
            },
        };

        const io = getIO();
        io.to(`conversation:${message.conversationId}`).emit('message:new', messageForClient);

        return message;
    }

    async getMessagesByConversation(
        userId: string,
        conversationId: string,
        options: { cursor?: string; limit: number }
    ) {
        const { cursor, limit = 20 } = options;

        const accessibleConversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId,
                participants: {
                    some: {
                        userId: userId,
                    },
                },
            },
            select: {
                id: true,
            },
        });

        if (!accessibleConversation) {
            throw new AppError('Forbidden', StatusCodes.FORBIDDEN);
        }

        const messagesPlusOne = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                sender: {
                    select: conversationUserSelect,
                },
            },
            take: limit + 1,
            ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        });

        const hasMore = messagesPlusOne.length > limit;

        const messages = hasMore ? messagesPlusOne.slice(0, limit) : messagesPlusOne;

        return {
            messages,
            hasMore,
        };
    }
}

export const messageService = new MessageService();
