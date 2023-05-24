import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Fetch } from '../gigs/gigSlice';
import { Gig } from '../../utils/types';

export const gigsApi = createApi({
  reducerPath: "fetchGigs",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  endpoints: (builder) => ({
    fetchGigs: builder.query<Gig[], Fetch>({
      query: ({ search, min, max, sort }) => {
        return {
          url: "/gigs",
          params: { search, min, max, sort }
        }
      },
    }),
    fetchGig: builder.query<Gig, string>({
      query: (gigId) => {
        return {
          url: `/gigs/${gigId}`,
        }
      },
    }),
  }),
});

// return `gigs?${search}${search == "" ? "" : "&"}min=${!min ? "" : min}&max=${!max ? "" : max}&sort=${sort}`;
export const { useFetchGigsQuery, useFetchGigQuery } = gigsApi;