/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://auto-shine-server.vercel.app/api/v1",
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});

const baseQueryWithLogout: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const res = await fetch(
      "https://auto-shine-server.vercel.app/api/v1/auth/access-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();

    console.log(data);
    if (data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(setUser({ user, token: data.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      window.location.href = "/login";
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithLogout,
  tagTypes: ["review", "service", "slots", "users", "booking"],
  endpoints: () => ({}),
});
