import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (productData) => ({
        url: "services/create-service",
        method: "POST",
        body: productData,
      }),
    }),
    getAllServices: builder.query({
      query: ({ searchTerm, sort }) => {
        const params = new URLSearchParams();

        // Add search term
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        // Add sort order
        if (sort) {
          params.append("sort", sort);
        }

        return {
          url: `services?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getFeaturedServices: builder.query({
      query: () => ({
        url: "services/featured",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetFeaturedServicesQuery,
} = productApi;
