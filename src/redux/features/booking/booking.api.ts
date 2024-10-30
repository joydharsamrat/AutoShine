import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ["booking"],
    }),
    initiatePayment: builder.mutation({
      query: (data) => ({
        url: "payment",
        method: "POST",
        body: data,
      }),
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "bookings",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    getBookingsForUser: builder.query({
      query: (id) => ({
        url: `bookings/user/${id}`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: `my-bookings`,
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useInitiatePaymentMutation,
  useGetAllBookingsQuery,
  useGetBookingsForUserQuery,
  useGetMyBookingsQuery,
} = bookingApi;
