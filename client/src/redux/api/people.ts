import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const peopleApi = createApi({
  reducerPath: 'people',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),

  endpoints: (builder) => ({
    getPeople: builder.query({
      query: () => '/people',
    }),

    getPeopleById: builder.query({
      query: (id) => `/people/${id}`,
    }),
  }),
});

export const { useGetPeopleQuery, useGetPeopleByIdQuery } = peopleApi;
