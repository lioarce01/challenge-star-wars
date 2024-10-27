import { Planet } from '@/types/planet';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetPlanetsArgs {
  offset: number;
  limit: number;
  climate?: string;
  terrain?: string;
}

interface getPlanetsResponse {
  results: Planet[];
  count: number;
}

interface FilterValues {
  climate: string[];
  terrain: string[];
}

export const planetApi = createApi({
  reducerPath: 'planet',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),

  endpoints: (builder) => ({
    getPlanets: builder.query<getPlanetsResponse, GetPlanetsArgs>({
      query: ({ offset, limit, ...params }) => ({
        url: 'planets',
        params: { offset, limit, ...params },
      }),
    }),

    getPlanetById: builder.query({
      query: (id) => `/planets/${id}`,
    }),

    getFilterValues: builder.query<FilterValues, void>({
      query: () => 'planets/filter-value',
    }),
  }),
});

export const {
  useGetPlanetsQuery,
  useGetPlanetByIdQuery,
  useGetFilterValuesQuery,
} = planetApi;
