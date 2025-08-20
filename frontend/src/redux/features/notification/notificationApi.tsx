import { apiSlice } from "../api/apiSlice";

const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotification: builder.query<any, void>({
            query: () => '/notifications/all/',
        }),
        getMarkRequestRead: builder.query({
            query: () => '/notifications/mark-request-read/',
        }),
    }),
});

export const {
    useGetAllNotificationQuery,
    useGetMarkRequestReadQuery,
} = notificationApi;
