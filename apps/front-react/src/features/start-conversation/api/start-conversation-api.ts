import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    ConversationRequest,
    ConversationResponseData,
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
            invalidatesTags: ['Conversations'],
        }),
    }),
});

export const { useStartConversationMutation } = conversationApi;
