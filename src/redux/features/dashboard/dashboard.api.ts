import { baseApi } from "../../api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMonthlyRevenue: builder.query({
      query: () => {
        // const params = new URLSearchParams();

        // if (limit) {
        //   params.append("limit", limit.toString());
        // }

        // return {
        //   url: `/reviews?${params.toString()}`,
        //   method: "GET",
        // };
        return {
          url: `/stats/monthly-revenue`,
          method: "GET",
        };
      },
    }),
    getMonthlyBookings: builder.query({
      query: () => {
        // const params = new URLSearchParams();

        // if (limit) {
        //   params.append("limit", limit.toString());
        // }

        // return {
        //   url: `/reviews?${params.toString()}`,
        //   method: "GET",
        // };
        return {
          url: `/stats/monthly-bookings`,
          method: "GET",
        };
      },
    }),
    getLatestBookings: builder.query({
      query: () => {
        // const params = new URLSearchParams();

        // if (limit) {
        //   params.append("limit", limit.toString());
        // }

        // return {
        //   url: `/reviews?${params.toString()}`,
        //   method: "GET",
        // };
        return {
          url: `/stats/latest-bookings`,
          method: "GET",
        };
      },
    }),
    getStats: builder.query({
      query: () => {
        return {
          url: `/stats/stats`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetMonthlyRevenueQuery,
  useGetMonthlyBookingsQuery,
  useGetLatestBookingsQuery,
  useGetStatsQuery,
} = dashboardApi;
