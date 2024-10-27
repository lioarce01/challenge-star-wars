import { People } from '@/types/people';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface GetPeoplesArgs {
  offset: number;
  limit: number;
  gender?: string;
  hair_color?: string;
  skin_color?: string;
}

interface GetPeoplesResponse {
  results: People[];
  count: number;
}

interface FilterValues {
  genders: string[];
  hairColors: string[];
  skinColors: string[];
  homeworlds: string[];
}

export const peopleApi = createApi({
  reducerPath: 'people',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),

  endpoints: (builder) => ({
    getPeoples: builder.query<GetPeoplesResponse, GetPeoplesArgs>({
      query: ({ offset, limit, ...params }) => ({
        url: 'people',
        params: { offset, limit, ...params },
      }),
    }),

    getPeopleById: builder.query({
      query: (id) => `people/${id}`,
    }),

    getFilterValues: builder.query<FilterValues, void>({
      query: () => 'people/filter-values',
    }),
  }),
});

export const {
  useGetPeoplesQuery,
  useGetPeopleByIdQuery,
  useGetFilterValuesQuery,
} = peopleApi;
