import {
    ConversationHeader,
    useGetConversationQuery,
} from '@/entities/conversation';
import { MessageList, useGetMessagesQuery } from '@/entities/message';
import { MessagesEmptyState } from '@/entities/message/ui/messages-empty';
import { MessageComposer } from '@/features/message/send-message';
import { isFetchBaseQueryError } from '@/shared/lib/handle-api-error';
import { useAppSelector } from '@/shared/lib/hooks';
import { socketService } from '@/shared/lib/socket/socket-service';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { ChatWindowError } from './chat-window-error';
import { ChatWindowNotFound } from './chat-window-not-found';
import { ChatWindowSkeleton } from './chat-window-skeleton';

export function ChatWindow() {
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

    const conversationQuery = useGetConversationQuery(
        conversationId ?? skipToken
    );
    const messagesQuery = useGetMessagesQuery(
        conversationQuery.isSuccess && conversationId
            ? conversationId
            : skipToken
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
    const messages = messagesQuery.data ?? [];

    return (
        <div className="flex h-full flex-col bg-background">
            <ConversationHeader
                conversation={conversation}
                currentUserId={me.id}
            />

            {messages.length > 0 ? (
                <MessageList
                    messages={messages}
                    meId={me.id}
                    conversationId={conversationId}
                />
            ) : (
                <MessagesEmptyState />
            )}

            <MessageComposer
                conversationId={conversationId}
                key={conversationId}
            />
        </div>
    );
}
