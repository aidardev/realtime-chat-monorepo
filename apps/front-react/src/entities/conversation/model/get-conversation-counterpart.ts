import type {
    ConversationDetails,
    ConversationListItem,
    PublicUser,
} from '@realtime-chat/schema';

export type ConversationWithParticipants =
    | ConversationListItem
    | ConversationDetails;

export function getConversationCounterpart(
    conversation: ConversationWithParticipants,
    currentUserId: string
): PublicUser | null {
    if (conversation.isGroup) {
        return null;
    }

    const participant = conversation.participants.find(
        (participant) => participant.userId !== currentUserId
    );

    return participant?.user ?? null;
}
