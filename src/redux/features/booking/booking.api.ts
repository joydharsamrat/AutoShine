import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
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
    }),
    getBookingsForUser: builder.query({
      query: (id) => ({
        url: `bookings/user/${id}`,
        method: "GET",
      }),
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: `my-bookings`,
        method: "GET",
      }),
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
