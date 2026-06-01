import { ScrollArea } from '@/shared/ui/scroll-area';
import type { MessageFull } from '@realtime-chat/schema';
import { MessageBubble } from './message-bubble';

interface MessageListProps {
    messages?: MessageFull[];
    meId: string;
}

export function MessageList({ messages = [], meId }: MessageListProps) {
    return (
        <ScrollArea className="flex-1 bg-muted/20 overflow-y-auto">
            <div className="flex flex-col gap-4 max-w-4xl mx-auto p-4">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} msg={msg} meId={meId} />
                ))}
            </div>
        </ScrollArea>
    );
}
