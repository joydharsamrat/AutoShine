import { baseApi } from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroupedSlotsByService: builder.query({
      query: () => ({
        url: "/slots/grouped",
        method: "GET",
      }),
      providesTags: ["slots"],
    }),
    getSlotsForService: builder.query({
      query: ({ serviceId, date }) => {
        const params = new URLSearchParams();

        if (serviceId) {
          params.append("serviceId", serviceId);
        }

        if (date) {
          params.append("date", date);
        }

        return {
          url: `/slots?${params.toString()}`,
          method: "GET",
        };
      },
    }),
    getSlotById: builder.query({
      query: (id) => {
        return {
          url: `/slots/${id}`,
          method: "GET",
        };
      },
    }),
    toggleSlotStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/slots/toggle-status/${id}`,
          method: "PUT",
          body: { status },
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useGetGroupedSlotsByServiceQuery,
  useGetSlotsForServiceQuery,
  useGetSlotByIdQuery,
  useToggleSlotStatusMutation,
} = slotApi;
