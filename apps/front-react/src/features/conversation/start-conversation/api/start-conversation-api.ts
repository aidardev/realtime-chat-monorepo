import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    ConversationDetails,
    ConversationRequest,
    ConversationResponseData,
} from '@realtime-chat/schema';

export const conversationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        startConversation: build.mutation<
            ConversationDetails,
            ConversationRequest
        >({
            query: (body) => ({
                url: '/conversations',
                body: body,
                method: 'post',
            }),
            transformResponse: (
                response: ApiDataResponse<ConversationResponseData>
            ) => {
                return response.data.conversation;
            },
            invalidatesTags: ['Conversations'],
        }),
    }),
});

export const { useStartConversationMutation } = conversationApi;
