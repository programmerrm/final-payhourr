import { apiSlice } from "../api/apiSlice";

const disputeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addDispute: builder.mutation({
            query: (data) => ({
                url: '/chat/dispute/',
                method: 'POST',
                body: data,
            }),
        }),
        addDisputeUpdate: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/chat/dispute/${id}/`,
                method: 'PATCH',
                body: data,
            }),
        }),
        getDispute: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) => `/chat/dispute/?search=${search}&page=${page}`,
        }),
        getSingleDispute: builder.query({
            query: (id) => `/chat/dispute/${id}/`,
        }),
    }),
});

export const {
    useAddDisputeMutation,
    useAddDisputeUpdateMutation,

    useGetDisputeQuery,
    useGetSingleDisputeQuery,
} = disputeApi;
