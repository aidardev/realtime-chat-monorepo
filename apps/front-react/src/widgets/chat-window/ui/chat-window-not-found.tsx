import { MessageSquareDashed } from 'lucide-react';

export function ChatWindowNotFound() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageSquareDashed className="size-8 text-muted-foreground" />
            </div>
            <div>
                <h3 className="font-semibold">Chat not found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    It may have been deleted, or you might not have access.
                </p>
            </div>
        </div>
    );
}
