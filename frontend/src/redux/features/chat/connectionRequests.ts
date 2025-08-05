import { apiSlice } from "../api/apiSlice";

const connectionRequests = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addconnectionRequestUser: builder.mutation({
            query: (data) => ({
                url: '/chat/connection-request-send/',
                method: 'POST',
                body: data,
            }),
        }),
        getConnectionReques: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) => `/chat/connection-requests/?search=${search}&page=${page}`,
        }),
        addConnectionRequestDelete: builder.mutation({
            query: (data) => ({
                url: '/chat/connection-request-delete/',
                method: 'DELETE',
                body: data,
            })
        }),
        addConnectionRequestUserList: builder.mutation({
            query: (data) => ({
                url: '/chat/connection-add-connected/',
                method: 'POST',
                body: data,
            })
        }),
    }),
});

export const { 
    useAddconnectionRequestUserMutation,
    useGetConnectionRequesQuery,
    useAddConnectionRequestDeleteMutation,
    useAddConnectionRequestUserListMutation,
} = connectionRequests;
