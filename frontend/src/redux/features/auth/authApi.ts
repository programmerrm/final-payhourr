import { apiSlice } from "../api/apiSlice";
import type { LoginResponse } from "../../../types/auth/LoginResponse";
import type { LoginProps } from "../../../types/auth/LoginProps";
import { setAuth } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addRegisterUser: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: '/accounts/user/register/',
                method: 'POST',
                body: formData,
            }),
        }),
        addLogingUser: builder.mutation<LoginResponse, LoginProps>({
            query: (formData) => ({
                url: '/accounts/user/login/',
                method: 'POST',
                body: formData,
            }),
            async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
                try {
                    const { data } = await queryFulfilled;
                    const authData = {
                        user: data.data.user,
                        tokens: {
                            access_token: data.data.tokens.access_token,
                            refresh_token: data.data.tokens.refresh_token,
                        },
                    };
                    dispatch(setAuth(authData));
                } catch (err: any) {
                    const errorMsg = err?.error?.data?.message || "Login failed!";
                    console.error("Login time error:", errorMsg);
                }
            },
        }),
        addForgotPassword: builder.mutation({
            query: (data) => ({
                url: "/accounts/user/forgot-password/",
                method: "POST",
                body: data,
            }),
        }),
        addConfirmPassword: builder.mutation({
            query: ({ data, uidb64, token }) => ({
                url: `/accounts/user/reset-password/${uidb64}/${token}/`,
                method: "POST",
                body: data,
            }),
        }),
        getUsers: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) =>
                `/accounts/users/?search=${search}&page=${page}`,
        }),
        addUserDelete: builder.mutation({
            query: (data) => ({
                url: `/accounts/user/delete/${data}/`,
                method: 'DELETE',
                body: data,
            }),
        }),
        getUser: builder.query<any, number>({
            query: (id) => `/accounts/user/${id}/`,
        })
    }),
});

export const {
    useAddRegisterUserMutation,
    useAddLogingUserMutation,
    useAddForgotPasswordMutation,
    useAddConfirmPasswordMutation,
    useGetUsersQuery,
    useAddUserDeleteMutation,
    useGetUserQuery,
} = authApi;
