import { GetPlanetsArgs, getPlanetsResponse, Planet } from '@/types/planet';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface FilterValues {
  climate: string[];
  terrain: string[];
}

const URL = process.env.NEXT_PUBLIC_API_URL;

export const planetApi = createApi({
  reducerPath: 'planet',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),

  endpoints: (builder) => ({
    getPlanets: builder.query<getPlanetsResponse, GetPlanetsArgs>({
      query: ({ offset, limit, ...params }) => ({
        url: '/planets',
        params: { offset, limit, ...params },
      }),
    }),

    getPlanetById: builder.query({
      query: (id) => `/planets/${id}`,
    }),

    getFilterValues: builder.query<FilterValues, void>({
      query: () => '/planets/filter-values',
    }),
  }),
});

export const {
  useGetPlanetsQuery,
  useGetPlanetByIdQuery,
  useGetFilterValuesQuery,
} = planetApi;
