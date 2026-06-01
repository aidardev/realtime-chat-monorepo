import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    MessageFull,
    MessagesResponseData,
} from '@realtime-chat/schema';

export const messageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMessages: build.query<MessageFull[], string>({
            query: (conversationId) =>
                `/conversations/${conversationId}/messages`,
            providesTags: (_result, _error, conversationId) => [
                { type: 'Messages', id: conversationId },
            ],
            transformResponse: (
                response: ApiDataResponse<MessagesResponseData>
            ) => {
                return response.data.messages;
            },
        }),
    }),
});

export const { useGetMessagesQuery } = messageApi;
