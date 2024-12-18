import {
  GetStarshipsArgs,
  GetStarshipsResponse,
  Starship,
} from '@/types/starship';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FilterValues {
  climate: string[];
  terrain: string[];
}

const URL = process.env.NEXT_PUBLIC_API_URL;

export const starshipApi = createApi({
  reducerPath: 'starship',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),

  endpoints: (builder) => ({
    getStarships: builder.query<GetStarshipsResponse, GetStarshipsArgs>({
      query: ({ offset, limit, ...params }) => ({
        url: '/starships',
        params: { offset, limit, ...params },
      }),
    }),

    getStarshipById: builder.query({
      query: (id) => `/starships/${id}`,
    }),

    getFilterValues: builder.query<FilterValues, void>({
      query: () => '/starships/filter-values',
    }),
  }),
});

export const {
  useGetStarshipsQuery,
  useGetStarshipByIdQuery,
  useGetFilterValuesQuery,
} = starshipApi;
