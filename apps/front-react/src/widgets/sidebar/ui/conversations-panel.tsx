import {
    ConversationList,
    ConversationPanelHeader,
    useGetConversationsQuery,
} from '@/entities/conversation';
import { useAppSelector } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Sidebar } from '@/shared/ui/sidebar';
import { Skeleton } from '@/shared/ui/skeleton';
import { AlertCircle, MessageSquareDashed, RefreshCw } from 'lucide-react';

export function ConversationsPanel() {
    const user = useAppSelector((state) => state.session.user);
    const {
        data: conversations = [],
        isLoading,
        isError,
        refetch,
    } = useGetConversationsQuery();

    if (!user) return null;

    return (
        <Sidebar
            collapsible="none"
            className="hidden flex-1 md:flex bg-muted/10 min-w-0"
        >
            <ConversationPanelHeader />

            {isLoading && <ConversationsPanelSkeleton />}

            {!isLoading && isError && (
                <ConversationsPanelError onRetry={refetch} />
            )}

            {!isLoading && !isError && conversations.length === 0 && (
                <ConversationsPanelEmpty />
            )}

            {!isLoading && !isError && conversations.length > 0 && (
                <ConversationList
                    conversations={conversations}
                    currentUserId={user.id}
                />
            )}
        </Sidebar>
    );
}

function ConversationsPanelSkeleton() {
    return (
        <div className="flex-1 overflow-hidden p-2">
            <div className="space-y-2">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 rounded-xl border bg-background/70 p-3"
                    >
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex items-center justify-between gap-3">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-10" />
                            </div>
                            <Skeleton className="h-3 w-40" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ConversationsPanelEmpty() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageSquareDashed className="size-8 text-muted-foreground" />
            </div>
            <div>
                <h3 className="font-semibold">Чатов пока нет</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Создайте новый диалог, чтобы начать общение.
                </p>
            </div>
        </div>
    );
}

function ConversationsPanelError({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="size-8 text-destructive" />
            </div>
            <div>
                <h3 className="font-semibold">Не удалось загрузить чаты</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    Проверьте соединение и попробуйте ещё раз.
                </p>
            </div>
            <Button variant="outline" onClick={onRetry}>
                <RefreshCw className="mr-2 size-4" />
                Повторить
            </Button>
        </div>
    );
}
