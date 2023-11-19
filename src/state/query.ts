import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Details } from "../services/StarWarsService.types";
import { GetPeopleArgs } from "./query.types";

export const swapiApi = createApi({
  reducerPath: "swapiApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
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

export const { useGetAllQuery, useGetByIdQuery, useLazyGetAllQuery } = swapiApi;
