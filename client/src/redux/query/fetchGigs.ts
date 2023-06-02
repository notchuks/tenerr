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
  tagTypes: ["Gigs"],
  endpoints: (builder) => ({
    fetchGigs: builder.query<Gig[], Fetch>({
      query: ({ search, min, max, sort }) => {
        return {
          url: "/gigs",
          params: { search, min, max, sort }
        }
      },
    }),
    fetchUserGigs: builder.query<Gig[], Partial<Fetch>>({
      query: ({ userId }) => {
        return {
          url: "/gigs",
          params: { userId }
        }
      },
      providesTags: (result) => result ?
            [
              ...result.map(({ _id }) => ({ type: 'Gigs', id: _id } as const)),
              { type: 'Gigs', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Gigs', id: 'LIST' }` is invalidated
            [{ type: 'Gigs', id: 'LIST' }],
    }),
    fetchGig: builder.query<Gig, string>({
      query: (gigId) => {
        return {
          url: `/gigs/${gigId}`,
        }
      },
    }),
    deleteGig: builder.mutation<string, string>({
      query(gigId) {
        return {
          url: `/gigs/${gigId}`,
          method: 'DELETE',
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Gigs', id: 'LIST' }],
    }),
    createGig: builder.mutation<Gig, Partial<Gig>>({
      query(body) {
        return {
          url: `/gigs/`,
          method: 'POST',
          body
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Gigs', id: 'LIST' }],
    }),
  }),
});

// return `gigs?${search}${search == "" ? "" : "&"}min=${!min ? "" : min}&max=${!max ? "" : max}&sort=${sort}`;
export const { useFetchGigsQuery, useFetchUserGigsQuery, useFetchGigQuery, useDeleteGigMutation, useCreateGigMutation } = gigsApi;