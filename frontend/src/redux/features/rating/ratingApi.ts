import { apiSlice } from "../api/apiSlice";

const ratingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addRating: builder.mutation({
            query: (data) => ({
                url: "/accounts/ratings/",
                method: "POST",
                body: data,
            }),
        }),
        getMyRatings: builder.query({
            query: () => "/accounts/ratings/",
        }),
    }),
});

export const { useAddRatingMutation, useGetMyRatingsQuery } = ratingApi;
