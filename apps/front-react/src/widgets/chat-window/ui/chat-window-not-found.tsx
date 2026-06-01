import { MessageSquareDashed } from 'lucide-react';

export function ChatWindowNotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageSquareDashed className="size-8 text-muted-foreground" />
            </div>
            <div>
                <h3 className="font-semibold">Чат не найден</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Возможно, он был удалён или у вас нет доступа.
                </p>
            </div>
        </div>
    );
}
