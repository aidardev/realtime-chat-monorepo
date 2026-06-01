import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    ConversationDetails,
    ConversationListItem,
    ConversationResponseData,
    ConversationsResponseData,
} from '@realtime-chat/schema';

export const conversationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getConversations: build.query<ConversationListItem[], void>({
            query: () => '/conversations',
            providesTags: ['Conversations'],
            transformResponse: (
                response: ApiDataResponse<ConversationsResponseData>
            ) => {
                return response.data.conversations;
            },
        }),
        getConversation: build.query<ConversationDetails, string>({
            query: (conversationId) => `/conversations/${conversationId}`,
            providesTags: (_result, _error, id) => [
                { type: 'Conversation', id },
            ],
            transformResponse: (
                response: ApiDataResponse<ConversationResponseData>
            ) => {
                return response.data.conversation;
            },
        }),
    }),
});

export const { useGetConversationsQuery, useGetConversationQuery } =
    conversationApi;
