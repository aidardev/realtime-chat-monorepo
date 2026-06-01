import { Skeleton } from '@/shared/ui/skeleton';

export function MessageBubbleSkeleton({
    align,
    width,
}: {
    align: 'start' | 'end';
    width: string;
}) {
    return (
        <div
            className={`flex w-full ${align === 'end' ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`space-y-2 rounded-2xl border bg-background p-3 ${width}`}
            >
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <div className="flex justify-end">
                    <Skeleton className="h-3 w-10" />
                </div>
            </div>
        </div>
    );
}
