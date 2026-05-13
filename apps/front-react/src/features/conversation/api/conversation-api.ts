import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    ConversationListItem,
    ConversationRequest,
    ConversationResponseData,
    ConversationsResponseData,
} from '@realtime-chat/schema';

export const conversationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        startConversation: build.mutation<
            ApiDataResponse<ConversationResponseData>,
            ConversationRequest
        >({
            query: (body) => ({
                url: '/conversations',
                body: body,
                method: 'post',
            }),
        }),
        getConversations: build.query<ConversationListItem[], void>({
            query: () => '/conversations',
            transformResponse: (
                response: ApiDataResponse<ConversationsResponseData>
            ) => {
                return response.data.conversations;
            },
        }),
    }),
});

export const { useStartConversationMutation, useGetConversationsQuery } =
    conversationApi;
