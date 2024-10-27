import { Starship } from '@/types/starship';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetStarshipsArgs {
  offset: number;
  limit: number;
  starship_class: string;
  manufacturer: string;
}

interface GetStarshipsResponse {
  results: Starship[];
  count: number;
}

interface FilterValues {
  climate: string[];
  terrain: string[];
}

export const starshipApi = createApi({
  reducerPath: 'starship',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),

  endpoints: (builder) => ({
    getStarships: builder.query<GetStarshipsResponse, GetStarshipsArgs>({
      query: ({ offset, limit, ...params }) => ({
        url: 'starships',
        params: { offset, limit, ...params },
      }),
    }),

    getStarshipById: builder.query({
      query: (id) => `/starships/${id}`,
    }),

    getFilterValues: builder.query<FilterValues, void>({
      query: () => 'starships/filter-values',
    }),
  }),
});

export const {
  useGetStarshipsQuery,
  useGetStarshipByIdQuery,
  useGetFilterValuesQuery,
} = starshipApi;
