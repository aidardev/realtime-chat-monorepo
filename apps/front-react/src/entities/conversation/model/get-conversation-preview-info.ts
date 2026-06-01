import { formatChatListTime } from '@/shared/lib/date';
import type { ConversationListItem } from '@realtime-chat/schema';
import {
    getConversationContext,
    type ConversationContext,
} from './get-conversation-context';

export interface ConversationPreviewInfo extends Pick<
    ConversationContext,
    'isGroup' | 'title' | 'avatar' | 'avatarFallback'
> {
    lastMessagePreview: string;
    updatedAtLabel: string;
}

export function getConversationPreviewInfo(
    conversation: ConversationListItem,
    currentUserId: string
): ConversationPreviewInfo {
    const context = getConversationContext(conversation, currentUserId);

    return {
        isGroup: context.isGroup,
        title: context.title,
        avatar: context.avatar,
        avatarFallback: context.avatarFallback,
        lastMessagePreview: conversation.lastMessage?.content ?? '',
        updatedAtLabel: formatChatListTime(conversation.updatedAt),
    };
}
