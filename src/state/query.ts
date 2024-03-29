import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Details } from "./queryApi.types";
import { GetPeopleArgs } from "./query.types";
import { HYDRATE } from "next-redux-wrapper";

export const swapiApi = createApi({
  reducerPath: "swapiApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAll: builder.query<ApiResponse<Details[]>, GetPeopleArgs | undefined>({
      query: ({ searchTerm = "", page = 1, limit = 10 } = {}) => ({
        url: `people`,
        params: { search: searchTerm, page, limit },
      }),
      transformResponse: (response: ApiResponse<Details[]>, _meta, arg) => ({
        ...response,
        results: response.results.slice(0, arg?.limit || 10),
      }),
    }),
    getById: builder.query<Details, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const {
  useGetAllQuery,
  useGetByIdQuery,
  useLazyGetAllQuery,
  util: { getRunningQueriesThunk },
  endpoints: { getAll, getById },
} = swapiApi;
