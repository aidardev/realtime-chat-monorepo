import { baseApi } from '@/shared/api/base-api';
import type {
    ApiDataResponse,
    User,
    UsersResponseData,
} from '@realtime-chat/schema';

export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAdminUsers: build.query<User[], void>({
            query: () => '/admin/users',
            transformResponse: (
                response: ApiDataResponse<UsersResponseData>
            ) => {
                return response.data.users;
            },
        }),
    }),
});

export const { useGetAdminUsersQuery } = adminApi;
