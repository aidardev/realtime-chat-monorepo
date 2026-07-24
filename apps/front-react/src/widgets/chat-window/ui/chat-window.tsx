import { ConversationHeader, useGetConversationQuery } from '@/entities/conversation';
import { MessageList, useGetMessagesQuery } from '@/entities/message';
import { MessagesEmptyState } from '@/entities/message/ui/messages-empty';
import { MessageComposer } from '@/features/message/send-message';
import { isFetchBaseQueryError } from '@/shared/lib/handle-api-error';
import { useAppSelector } from '@/shared/lib/hooks';
import { socketService } from '@/shared/lib/socket/socket-service';
import { ConversationInfoSheet } from '@/widgets/sidebar';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ChatWindowError } from './chat-window-error';
import { ChatWindowNotFound } from './chat-window-not-found';
import { ChatWindowSkeleton } from './chat-window-skeleton';

export function ChatWindow() {
    const [infoOpen, setInfoOpen] = useState(false);

    const { conversationId } = useParams();
    const me = useAppSelector((state) => state.session.user);

    useEffect(() => {
        if (!conversationId || !socketService.socket) return;

        socketService.socket.emit('conversation:join', { conversationId });

        return () => {
            socketService.socket?.emit('conversation:leave', {
                conversationId,
            });
        };
    }, [conversationId]);

    const conversationQuery = useGetConversationQuery(conversationId ?? skipToken);
    const messagesQuery = useGetMessagesQuery(
        conversationQuery.isSuccess && conversationId ? conversationId : skipToken
    );

    if (!me || !conversationId) {
        return null;
    }

    if (conversationQuery.isLoading) {
        return <ChatWindowSkeleton />;
    }

    if (
        conversationQuery.isError &&
        isFetchBaseQueryError(conversationQuery.error) &&
        conversationQuery.error.status === 404
    ) {
        return <ChatWindowNotFound />;
    }

    if (conversationQuery.isError) {
        return <ChatWindowError onRetry={conversationQuery.refetch} />;
    }

    if (!conversationQuery.data) {
        return <ChatWindowNotFound />;
    }

    if (messagesQuery.isLoading) {
        return <ChatWindowSkeleton />;
    }

    if (messagesQuery.isError) {
        return <ChatWindowError onRetry={messagesQuery.refetch} />;
    }

    const conversation = conversationQuery.data;
    const { messages = [], hasMore = true } = messagesQuery.data ?? {};

    return (
        <div className="flex h-full flex-col bg-background">
            <ConversationHeader
                conversation={conversation}
                currentUserId={me.id}
                onInfoClick={() => setInfoOpen(true)}
            />

            <ConversationInfoSheet
                conversation={conversation}
                currentUserId={me.id}
                open={infoOpen}
                onOpenChange={setInfoOpen}
            />

            {messages.length > 0 ? (
                <MessageList
                    messages={messages}
                    meId={me.id}
                    conversationId={conversationId}
                    hasMore={hasMore}
                />
            ) : (
                <MessagesEmptyState />
            )}

            <MessageComposer conversationId={conversationId} key={conversationId} />
        </div>
    );
}
