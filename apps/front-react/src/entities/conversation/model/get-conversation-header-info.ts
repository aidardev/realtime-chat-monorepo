import type { ConversationDetails } from '@realtime-chat/schema';
import {
    getConversationContext,
    type ConversationContext,
} from './get-conversation-context';

export interface ConversationHeaderInfo extends Pick<
    ConversationContext,
    'isGroup' | 'title' | 'avatar' | 'avatarFallback'
> {}

export function getConversationHeaderInfo(
    conversation: ConversationDetails,
    currentUserId: string
): ConversationHeaderInfo {
    const context = getConversationContext(conversation, currentUserId);

    return {
        isGroup: context.isGroup,
        title: context.title,
        avatar: context.avatar,
        avatarFallback: context.avatarFallback,
    };
}
