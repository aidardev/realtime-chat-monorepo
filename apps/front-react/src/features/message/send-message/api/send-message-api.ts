import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    MessagePreview,
    MessageResponseData,
    SendMessageInput,
} from '@realtime-chat/schema';

export const messageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        sendMessage: build.mutation<MessagePreview, SendMessageInput>({
            query: (body) => ({
                url: `/conversations/${body.id}/messages`,
                body: {
                    content: body.content,
                },
                method: 'post',
            }),
            transformResponse: (
                response: ApiDataResponse<MessageResponseData>
            ) => {
                return response.data.message;
            },
            invalidatesTags(_result, _error, arg) {
                return [
                    { type: 'Messages', id: arg.id },
                    { type: 'Conversations' },
                ];
            },
        }),
    }),
});

export const { useSendMessageMutation } = messageApi;
