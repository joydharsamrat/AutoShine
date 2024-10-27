import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (review) => ({
        url: "reviews/create-review",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["review"],
    }),
    getAllReviews: builder.query({
      query: ({ limit }) => {
        const params = new URLSearchParams();

        if (limit) {
          params.append("limit", limit.toString());
        }

        return {
          url: `reviews?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery } = productApi;
