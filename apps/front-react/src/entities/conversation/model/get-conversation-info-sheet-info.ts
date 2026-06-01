import type { ConversationDetails } from '@realtime-chat/schema';
import {
    getConversationContext,
    type ConversationContext,
} from './get-conversation-context';

export interface ConversationPreviewInfo extends Pick<
    ConversationContext,
    'isGroup' | 'title' | 'avatar' | 'avatarFallback'
> {
    username: string | null;
    bio: string | null;
    name: string | null;
    participantsCount: number;
}

export function getConversationInfoSheetInfo(
    conversation: ConversationDetails,
    currentUserId: string
): ConversationPreviewInfo {
    const context = getConversationContext(conversation, currentUserId);

    return {
        isGroup: context.isGroup,
        title: context.title,
        avatar: context.avatar,
        avatarFallback: context.avatarFallback,
        bio: context.counterpartBio,
        username: context.counterpartUsername,
        name: context.counterpartName,
        participantsCount: conversation.participants.length,
    };
}
