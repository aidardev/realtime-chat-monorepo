import {
    getConversationCounterpart,
    type ConversationWithParticipants,
} from './get-conversation-counterpart';

export interface ConversationContext {
    title: string;
    avatar: string | null;
    avatarFallback: string;
    isGroup: boolean;
    counterpart: ReturnType<typeof getConversationCounterpart>;
    counterpartUsername: string | null;
    counterpartBio: string | null;
    counterpartName: string | null;
}

export function getConversationContext(
    conversation: ConversationWithParticipants,
    currentUserId: string
): ConversationContext {
    const counterpart = getConversationCounterpart(conversation, currentUserId);

    const title = conversation.isGroup
        ? (conversation.name ?? 'Group chat')
        : (counterpart?.name ?? counterpart?.username ?? 'Unknown user');

    const avatar = conversation.isGroup ? null : (counterpart?.avatar ?? null);

    const avatarFallback = conversation.isGroup
        ? (conversation.name?.slice(0, 2).toUpperCase() ?? 'GC')
        : (counterpart?.name ?? counterpart?.username ?? 'UN')
              .slice(0, 2)
              .toUpperCase();

    return {
        title,
        avatar,
        avatarFallback,
        isGroup: conversation.isGroup,
        counterpart,
        counterpartUsername: counterpart?.username ?? null,
        counterpartBio: counterpart?.bio ?? null,
        counterpartName: counterpart?.name ?? null,
    };
}
