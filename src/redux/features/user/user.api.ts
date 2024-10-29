import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    makeAdmin: builder.mutation({
      query: (id) => ({
        url: `users/make-admin?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery, useMakeAdminMutation } = userApi;
