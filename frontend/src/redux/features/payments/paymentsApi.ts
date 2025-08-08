import { apiSlice } from "../api/apiSlice";

const paymentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addPaymentMethod: builder.mutation({
            query: (data) => ({
                url: '/payments/payment-options/',
                method: 'POST',
                body: data,
            }),
        }),
        addPayment: builder.mutation({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: data,
            }),
        }),
        addPaymentMethodDelete: builder.mutation({
            query: (id) => ({
                url: `/payments/payment-options/${id}/`,
                method: 'DELETE',
            })
        }),
        addPaymentMethodUpdate: builder.mutation({
            query: ({ id, data }) => ({
                url: `/payments/payment-options/${id}/`,
                method: 'PUT',
                body: data,
            }),
        }),
        addDeposit: builder.mutation({
            query: (data) => ({
                url: '/payments/deposits/',
                method: 'POST',
                body: data,
            }),
        }),
        addWithdraw: builder.mutation({
            query: (data) => ({
                url: '/payments/withdraws/',
                method: 'POST',
                body: data,
            }),
        }),
        addDepositUpdate: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/payments/deposits/${id}/`,
                method: 'PATCH',
                body: data,
            }),
        }),
        addWithdrawUpdate: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/payments/withdraws/${id}/`,
                method: 'PATCH',
                body: data,
            }),
        }),

        getPaymentMethod: builder.query<any, void>({
            query: () => '/payments/payment-options/',
        }),
        getDeposit: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) => `/payments/deposits/?search=${search}&page=${page}`,
        }),
        getWithdraw: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) => `/payments/withdraws/?search=${search}&page=${page}`,
        }),
        getAllTransaction: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) => `/payments/all-transactions/?search=${search}&page=${page}`,
        }),
        getPaymentHistory: builder.query<any, { page?: number }>({
            query: ({ page = 1 }) => `/payments/history/?page=${page}`,
        }),
        getBalance: builder.query<any, void>({
            query: () => '/payments/balance/'
        }),
        getPaymnetCounts: builder.query<any, void>({
            query: () => '/payments/counts/',
        }),
    }),
});

export const {
    useAddPaymentMethodMutation,
    useAddPaymentMutation,
    useAddPaymentMethodDeleteMutation,
    useAddPaymentMethodUpdateMutation,
    useAddDepositMutation,
    useAddWithdrawMutation,
    useAddDepositUpdateMutation,
    useAddWithdrawUpdateMutation,

    useGetPaymentMethodQuery,
    useGetDepositQuery,
    useGetWithdrawQuery,
    useGetAllTransactionQuery,
    useGetPaymentHistoryQuery,
    useGetBalanceQuery,
    useGetPaymnetCountsQuery,
} = paymentsApi;
