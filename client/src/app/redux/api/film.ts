import { Film } from '@/types/film';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetFilmsArgs {
  offset: number;
  limit: number;
  producer?: string;
  director?: string;
}

interface GetFilmsResponse {
  results: Film[];
  count: number;
}

interface FilterValues {
  producer: string[];
  director: string[];
}

const URL = process.env.NEXT_PUBLIC_API_URL;

export const filmApi = createApi({
  reducerPath: 'film',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),

  endpoints: (builder) => ({
    getFilms: builder.query<GetFilmsResponse, GetFilmsArgs>({
      query: ({ offset, limit, ...params }) => ({
        url: '/films',
        params: { offset, limit, ...params },
      }),
    }),

    getFilmById: builder.query({
      query: (id) => `/films/${id}`,
    }),

    getFilterValues: builder.query<FilterValues, void>({
      query: () => '/films/filter-values',
    }),
  }),
});

export const {
  useGetFilmsQuery,
  useGetFilmByIdQuery,
  useGetFilterValuesQuery,
} = filmApi;
