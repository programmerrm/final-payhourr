import { apiSlice } from "../api/apiSlice";

const chatAPi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessageList: builder.query<any, string>({
            query: (room_name) => `/chat/message/${room_name}/`,
        }),
        addFileUpload: builder.mutation({
            query: (data) => ({
                url: "/chat/file-upload/",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetMessageListQuery,
    useAddFileUploadMutation,
} = chatAPi;
