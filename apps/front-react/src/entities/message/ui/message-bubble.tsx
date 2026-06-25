import { formatChatTime } from '@/shared/lib/date';
import type { MessageFull } from '@realtime-chat/schema';

interface MessageBubbleProps {
    msg: MessageFull;
    meId: string;
}

export function MessageBubble({ msg, meId }: MessageBubbleProps) {
    const isMine = msg.senderId === meId;

    return (
        <div
            className={`flex w-full ${
                isMine ? 'justify-end' : 'justify-start'
            }`}
        >
            <div
                className={`flex max-w-[70%] flex-col gap-1 rounded-xl px-4 py-2 text-sm shadow-sm ${
                    isMine
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-white dark:bg-zinc-800 border rounded-tl-none'
                }`}
            >
                <div>{msg.content}</div>
                <div
                    className={`text-[10px] self-end ${
                        isMine
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                    }`}
                >
                    {formatChatTime(msg.createdAt)}
                </div>
            </div>
        </div>
    );
}
