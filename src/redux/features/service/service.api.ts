import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (service) => ({
        url: "services/create-service",
        method: "POST",
        body: service,
      }),
    }),
    getAllServices: builder.query({
      query: ({ searchTerm, sort }) => {
        const params = new URLSearchParams();

        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }

        if (sort) {
          params.append("sort", sort);
        }

        return {
          url: `services?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["service"],
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

    updateService: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `services/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["service"],
    }),
    deleteService: builder.mutation({
      query: (id) => {
        return {
          url: `services/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["service"],
    }),
    createSlots: builder.mutation({
      query: (data) => {
        return {
          url: `services/slots`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useGetFeaturedServicesQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useCreateSlotsMutation,
} = productApi;
