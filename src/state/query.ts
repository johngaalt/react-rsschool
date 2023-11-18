import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse, Details } from "../services/StarWarsService.types";
import { GetPeopleArgs } from "./query.types";

export const swapiApi = createApi({
  reducerPath: "swapiApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://swapi.dev/api/" }),
  endpoints: (builder) => ({
    getAll: builder.query<ApiResponse<Details[]>, GetPeopleArgs>({
      query: ({ searchTerm, page }) => {
        const searchParams = new URLSearchParams();
        if (searchTerm) {
          searchParams.append("search", searchTerm);
        }
        if (page) {
          searchParams.append("page", page.toString());
        }
        return { url: `people/?${searchParams}` };
      },
    }),
    getById: builder.query<Details, string>({
      query: (id) => `people/${id}`,
    }),
  }),
});

export const { useGetAllQuery, useGetByIdQuery } = swapiApi;
