import { apiSlice } from "../api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBuyerDashboardInfo: builder.query<any, void>({
            query: () => '/dashboard/buyer-info/',
        }),
        getSellerDashboardInfo: builder.query<any, void>({
            query: () => '/dashboard/seller-info/',
        }),
        getAdminDashboardInfo: builder.query<any, void>({
            query: () => '/dashboard/admin-info/',
        }),
    }),
});

export const {
    useGetBuyerDashboardInfoQuery,
    useGetSellerDashboardInfoQuery,
    useGetAdminDashboardInfoQuery,
} = dashboardApi;
