import { apiSlice } from "../api/apiSlice";

const connectedUsers = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConnectedUsers: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) => `/chat/connected-users/?search=${search}&page=${page}`,
        }),
        getConnectedUsersWithOutPagination: builder.query<any, void>({
            query: () => '/chat/connected-users-with-out-pagination/',
        })
    }),
});

export const {
    useGetConnectedUsersQuery,
    useGetConnectedUsersWithOutPaginationQuery,
} = connectedUsers;
