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
    getServiceById: builder.query({
      query: (id) => ({
        url: `services/${id}`,
        method: "GET",
      }),
    }),
    getFeaturedServices: builder.query({
      query: () => ({
        url: "services/featured",
        method: "GET",
      }),
    }),
    getSlotsForService: builder.query({
      query: ({ serviceId, date }) => {
        const params = new URLSearchParams();

        // Add search term
        if (serviceId) {
          params.append("serviceId", serviceId);
        }

        // Add sort order
        if (date) {
          params.append("date", date);
        }

        return {
          url: `slots?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useGetFeaturedServicesQuery,
  useGetSlotsForServiceQuery,
} = productApi;
