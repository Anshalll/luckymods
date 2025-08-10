import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const MainQueries = createApi({
  reducerPath: 'mainqueries',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_APP_SERVER_URL}` }),
  endpoints: (builder) => ({
    getAccessData: builder.query({
      query: (name) => ({
        url: name,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }

      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => response,


    }),
    MutateForm: builder.mutation({
      query: ({ path, data, method }) => ({
        url: path,
        credentials: "include",
        method,
        body: data,
      }),
    }),
  }),
})


export const { useGetAccessDataQuery, useMutateFormMutation } = MainQueries