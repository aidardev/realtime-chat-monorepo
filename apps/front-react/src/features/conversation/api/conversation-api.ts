import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    ConversationData,
    ConversationRequest,
} from '@realtime-chat/schema';

export const conversationApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        start: build.mutation<
            ApiDataResponse<ConversationData>,
            ConversationRequest
        >({
            query: (body) => ({
                url: '/conversations',
                body: body,
                method: 'post',
            }),
        }),
    }),
});

export const { useStartMutation } = conversationApi;
