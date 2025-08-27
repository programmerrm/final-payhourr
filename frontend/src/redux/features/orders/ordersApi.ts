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
        addOrderUpdate: builder.mutation({
            query: ({id, ...formData}) => ({
                url: `/orders/update/${id}/`,
                method: 'PATCH',
                body: formData,
            }),
        }),

        getAllOrders: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) => `/orders/all/?search=${search}&page=${page}`,
        }),
        getSingleOrder: builder.query<any, number>({
            query: (id) => `/orders/single-order/${id}/`,
        }),
        getReciverOrder: builder.query<any, void>({
            query: () => '/orders/receiver-order/',
        }),
        getOrders: builder.query<any, { search?: string; page?: number }>({
            query: ({ search = '', page = 1 }) => `/orders/list/?search=${search}&page=${page}`,
        }),
    }),
});

export const {
    useAddInitPaymentMutation,
    useAddOrderCreateMutation,
    useAddOrderUpdateMutation,

    useGetAllOrdersQuery,
    useGetReciverOrderQuery,
    useGetOrdersQuery,
    useGetSingleOrderQuery,
} = ordersApi;
