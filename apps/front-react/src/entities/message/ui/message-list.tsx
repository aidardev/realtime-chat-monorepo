import { ScrollArea } from '@/shared/ui/scroll-area';
import type { MessageFull } from '@realtime-chat/schema';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import {
    useGetTypingUsersQuery,
    useLoadMoreMessagesMutation,
} from '../api/message-api';
import { buildMessageListItems } from '../model/build-message-list-items';
import { MessageBubble } from './message-bubble';
import { MessageDaySeparator } from './message-day-separator';

interface MessageListProps {
    messages: MessageFull[];
    meId: string;
    conversationId: string;
    hasMore: boolean;
}

const SCROLL_BOTTOM_THRESHOLD = 100;

export function MessageList({
    messages = [],
    meId,
    conversationId,
    hasMore,
}: MessageListProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const prevConversationIdRef = useRef<string | undefined>(undefined);
    const prevScrollHeightRef = useRef<number>(0);
    const prevLastMessageIdRef = useRef<string | undefined>(undefined);
    const wasLoadingMoreRef = useRef(false);

    const { data: typingUsers = [] } = useGetTypingUsersQuery(conversationId);
    const [loadMoreMessages, { isLoading: isLoadingMore }] =
        useLoadMoreMessagesMutation();

    const items = useMemo(() => buildMessageListItems(messages), [messages]);

    const getScrollContainer = () => viewportRef.current;

    const isNearBottom = () => {
        const container = getScrollContainer();
        if (!container) return false;
        const { scrollTop, scrollHeight, clientHeight } = container;
        return (
            scrollHeight - scrollTop - clientHeight < SCROLL_BOTTOM_THRESHOLD
        );
    };

    const scrollToBottom = (behavior: ScrollBehavior = 'instant') => {
        const container = getScrollContainer();
        if (!container) return;
        container.scrollTo({ top: container.scrollHeight, behavior });
    };

    const prevIsLoadingMoreRef = useRef(false);
    useLayoutEffect(() => {
        if (prevIsLoadingMoreRef.current && !isLoadingMore) {
            wasLoadingMoreRef.current = true;
        }
        prevIsLoadingMoreRef.current = isLoadingMore;
    }, [isLoadingMore]);

    useLayoutEffect(() => {
        const container = getScrollContainer();
        if (!container) return;

        // mounted or conversationId changed
        if (prevConversationIdRef.current !== conversationId) {
            prevConversationIdRef.current = conversationId;
            prevLastMessageIdRef.current = messages[messages.length - 1]?.id;
            prevScrollHeightRef.current = container.scrollHeight;
            container.scrollTop = container.scrollHeight;
            return;
        }

        // chat history loaded.
        // TODO: Consider refactoring this to be entirely data-driven too (e.g., tracking the oldest message ID)
        // instead of relying on the operation-based 'wasLoadingMoreRef' flag.
        if (wasLoadingMoreRef.current) {
            wasLoadingMoreRef.current = false;
            const diff = container.scrollHeight - prevScrollHeightRef.current;
            if (diff > 0) {
                container.scrollTop += diff;
            }
            prevScrollHeightRef.current = container.scrollHeight;
            return;
        }

        // new message
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.id !== prevLastMessageIdRef.current) {
            prevLastMessageIdRef.current = lastMessage.id;
            prevScrollHeightRef.current = container.scrollHeight;
            if (isNearBottom()) {
                scrollToBottom('smooth');
            }
        }
    }, [messages, conversationId]);

    useLayoutEffect(() => {
        if (typingUsers.length > 0 && isNearBottom()) {
            scrollToBottom('smooth');
        }
    }, [typingUsers]);

    useEffect(() => {
        if (isLoadingMore || !hasMore) return;

        const sentinel = sentinelRef.current;
        const container = getScrollContainer();
        if (!sentinel || !container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry?.isIntersecting) return;

                const oldestMessage = messages[0];
                if (!oldestMessage) return;

                prevScrollHeightRef.current = container.scrollHeight;

                loadMoreMessages({
                    conversationId,
                    cursor: oldestMessage.id,
                });
            },
            {
                root: container,
                threshold: 0,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [messages, isLoadingMore, hasMore, conversationId, loadMoreMessages]);

    return (
        <ScrollArea
            className="flex-1 bg-muted/20 overflow-y-auto"
            viewportRef={viewportRef}
        >
            <div className="flex flex-col gap-4 max-w-4xl mx-auto p-4">
                <div ref={sentinelRef} className="h-px"></div>

                {isLoadingMore && (
                    <div className="absolute top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
                        <span className="rounded-full bg-muted/90 backdrop-blur-sm border border-border/50 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-sm animate-pulse">
                            Loading chat history...
                        </span>
                    </div>
                )}

                {items.map((item) =>
                    item.type === 'separator' ? (
                        <MessageDaySeparator key={item.id} label={item.label} />
                    ) : (
                        <MessageBubble
                            key={item.id}
                            msg={item.message}
                            meId={meId}
                        />
                    )
                )}

                {typingUsers.length > 0 && (
                    <div className="text-xs text-muted-foreground italic animate-pulse">
                        {typingUsers.length === 1
                            ? 'Typing...'
                            : 'Several people are typing...'}
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}
