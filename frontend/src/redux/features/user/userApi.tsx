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
        addUpdateUser: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/accounts/user/update/${id}/`,
                method: 'PATCH',
                body: formData,
            }),
        }),
        addPasswordChange: builder.mutation({
            query: (data) => ({
                url: '/accounts/user/password/change/',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const {
    useAdminUpdateUserMutation,
    useAddUpdateUserMutation,
    useAddPasswordChangeMutation,
} = userApi;
