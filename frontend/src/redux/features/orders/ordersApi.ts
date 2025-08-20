import { apiSlice } from "../api/apiSlice";

const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addInitPayment: builder.mutation({
            query: (formData) => ({
                url: '/payments/init-payment/',
                method: 'POST',
                body: formData,
            }),
        }),
        addOrderCreate: builder.mutation({
            query: (formData) => ({
                url: '/orders/create/',
                method: 'POST',
                body: formData,
            }),
        }),
        getReciverOrder: builder.query<any, void>({
            query: () => '/orders/receiver-order/',
        }),
    }),
});

export const {
    useAddInitPaymentMutation,
    useAddOrderCreateMutation,

    useGetReciverOrderQuery,
} = ordersApi;
