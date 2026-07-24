import { formatMessageDayLabel, isSameDay } from '@/shared/lib/date';
import type { MessageFull } from '@realtime-chat/schema';

type MessageListItem =
    | { type: 'separator'; id: string; label: string }
    | { type: 'message'; id: string; message: MessageFull };

export function buildMessageListItems(messages: MessageFull[]): MessageListItem[] {
    const items: MessageListItem[] = [];

    messages.forEach((msg, index) => {
        const prev = index > 0 ? messages[index - 1] : undefined;

        if (!prev || !isSameDay(prev.createdAt, msg.createdAt)) {
            items.push({
                type: 'separator',
                id: `separator-${msg.id}`,
                label: formatMessageDayLabel(msg.createdAt),
            });
        }

        items.push({ type: 'message', id: msg.id, message: msg });
    });

    return items;
}
