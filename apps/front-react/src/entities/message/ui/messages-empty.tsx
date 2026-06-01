import { MessageSquareDashed } from 'lucide-react';

export function MessagesEmptyState() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-muted/20 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageSquareDashed className="size-8 text-muted-foreground" />
            </div>
            <div>
                <h3 className="font-semibold">Сообщений пока нет</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Напишите первое сообщение, чтобы начать переписку.
                </p>
            </div>
        </div>
    );
}
