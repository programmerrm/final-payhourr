import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminUpdateUser: builder.mutation({
            query: ({ id, ...patchData }) => ({
                url: `/accounts/user/admin/update/${id}/`,
                method: 'PATCH',
                body: patchData,
            }),
        }),
    }),
});

export const {
    useAdminUpdateUserMutation,
} = userApi;
