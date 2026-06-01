import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    MessageResponseData,
    SendMessageInput,
} from '@realtime-chat/schema';

export const messageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        sendMessage: build.mutation<
            ApiDataResponse<MessageResponseData>,
            SendMessageInput
        >({
            query: (body) => ({
                url: `/conversations/${body.id}/messages`,
                body: {
                    content: body.content,
                },
                method: 'post',
            }),
            invalidatesTags(_result, _error, arg) {
                return [{ type: 'Messages', id: arg.id }];
            },
        }),
    }),
});

export const { useSendMessageMutation } = messageApi;
