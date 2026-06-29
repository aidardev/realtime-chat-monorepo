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

export function MessageList({
    messages = [],
    meId,
    conversationId,
    hasMore,
}: MessageListProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const chatInnerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const prevLastMessageId = useRef<string | undefined>(
        messages[messages.length - 1]?.id
    );
    const firstMessageIdRef = useRef<string | undefined>(messages[0]?.id);
    const scrollHeightRef = useRef<number>(0);

    const SCROLL_BOTTOM_THRESHOLD = 100;

    const { data: typingUsers = [] } = useGetTypingUsersQuery(conversationId);
    const [loadMoreMessages, { isLoading: isLoadingMore }] =
        useLoadMoreMessagesMutation();

    const items = useMemo(() => buildMessageListItems(messages), [messages]);

    /**
     * Radix UI ScrollArea wraps the native viewport.
     * We need to query it directly to manage accurate manual scroll positions.
     */
    const getScrollContainer = () => {
        return scrollContainerRef.current?.querySelector(
            '[data-radix-scroll-area-viewport]'
        );
    };

    const scrollToBottom = () => {
        chatInnerRef.current?.scrollIntoView(false);
    };

    const isNearBottom = () => {
        const container = getScrollContainer();
        if (!container) return;

        const { scrollTop, scrollHeight, clientHeight } = container;

        return (
            scrollHeight - scrollTop - clientHeight < SCROLL_BOTTOM_THRESHOLD
        );
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    useLayoutEffect(() => {
        const container = getScrollContainer();
        const oldestMessage = messages[0];

        if (!container || !oldestMessage) return;

        /**
         * If the oldest message ID changed, it means historical data was prepended.
         * We adjust the scrollTop by the height difference to prevent the scrollbar
         * from jumping and jumping back to the top, keeping the user's view stable.
         */
        if (
            firstMessageIdRef.current &&
            oldestMessage.id !== firstMessageIdRef.current
        ) {
            const newScrollHeight = container.scrollHeight;
            const heightDifference = newScrollHeight - scrollHeightRef.current;

            container.scrollTop = container.scrollTop + heightDifference;
        }

        firstMessageIdRef.current = oldestMessage.id;
        scrollHeightRef.current = container.scrollHeight;
    }, [messages]);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        const isNewMessage =
            lastMessage && lastMessage.id !== prevLastMessageId.current;

        console.log(
            messages,
            lastMessage,
            isNewMessage,
            prevLastMessageId.current,
            isNearBottom()
        );
        if (isNewMessage && isNearBottom()) {
            scrollToBottom();
        }
        prevLastMessageId.current = lastMessage?.id;
    }, [messages]);

    useEffect(() => {
        if (isNearBottom()) {
            scrollToBottom();
        }
    }, [typingUsers]);

    useEffect(() => {
        if (isLoadingMore || !hasMore) return;

        const sentinel = sentinelRef.current;
        const scrollContainer = scrollContainerRef.current;
        if (!sentinel || !scrollContainer) return;

        const actualScrollContainer = getScrollContainer() || scrollContainer;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry?.isIntersecting) {
                    const oldestMessage = messages[0];
                    if (!oldestMessage) return;

                    if (actualScrollContainer) {
                        scrollHeightRef.current =
                            actualScrollContainer.scrollHeight;
                    }

                    loadMoreMessages({
                        conversationId,
                        cursor: oldestMessage.id,
                    });
                }
            },
            {
                root: actualScrollContainer,
                threshold: 0,
            }
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [messages, isLoadingMore, hasMore, conversationId, loadMoreMessages]);

    return (
        <ScrollArea
            className="flex-1 bg-muted/20 overflow-y-auto"
            ref={scrollContainerRef}
        >
            <div
                className="flex flex-col gap-4 max-w-4xl mx-auto p-4"
                ref={chatInnerRef}
            >
                <div ref={sentinelRef} className="h-px"></div>

                {isLoadingMore && (
                    <div className="text-center text-xs text-muted-foreground py-2">
                        Loading chat history...
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
