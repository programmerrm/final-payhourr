import { apiSlice } from "../api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBuyerDashboardInfo: builder.query<any, void>({
            query: () => '/dashboard/buyer-info/',
        }),
    }),
});

export const {
    useGetBuyerDashboardInfoQuery,
} = dashboardApi;
