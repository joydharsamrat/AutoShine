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
  }),
});

export const { useCreateServiceMutation } = productApi;
