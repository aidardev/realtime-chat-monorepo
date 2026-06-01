import { MessageBubbleSkeleton } from '@/entities/message/ui/message-bubble-skeleton';
import { Skeleton } from '@/shared/ui/skeleton';

export function ChatWindowSkeleton() {
    return (
        <div className="flex h-full flex-col bg-background">
            <div className="flex h-16 items-center justify-between border-b px-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-hidden bg-muted/20 p-4">
                <div className="mx-auto flex max-w-4xl flex-col gap-4">
                    <MessageBubbleSkeleton align="start" width="w-48" />
                    <MessageBubbleSkeleton align="end" width="w-64" />
                    <MessageBubbleSkeleton align="start" width="w-56" />
                    <MessageBubbleSkeleton align="end" width="w-40" />
                    <MessageBubbleSkeleton align="start" width="w-72" />
                </div>
            </div>

            <div className="border-t bg-background p-4">
                <div className="mx-auto flex max-w-4xl items-end gap-2">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-10 flex-1 rounded-xl" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
            </div>
        </div>
    );
}
