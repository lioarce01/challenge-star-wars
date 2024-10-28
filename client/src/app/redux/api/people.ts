import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPeoplesResponse, GetPeoplesArgs } from '@/types/people';

interface FilterValues {
  genders: string[];
  hairColors: string[];
  skinColors: string[];
  homeworlds: string[];
}

const URL = process.env.NEXT_PUBLIC_API_URL;

export const peopleApi = createApi({
  reducerPath: 'people',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),

  endpoints: (builder) => ({
    getPeoples: builder.query<GetPeoplesResponse, GetPeoplesArgs>({
      query: ({ offset, limit, ...params }) => ({
        url: '/people',
        params: { offset, limit, ...params },
      }),
    }),

    getPeopleById: builder.query({
      query: (id) => `/people/${id}`,
    }),

    getFilterValues: builder.query<FilterValues, void>({
      query: () => '/people/filter-values',
    }),
  }),
});

export const {
  useGetPeoplesQuery,
  useGetPeopleByIdQuery,
  useGetFilterValuesQuery,
} = peopleApi;
