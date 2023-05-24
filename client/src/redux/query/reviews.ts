import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Review } from '../../utils/types';

export const reviewsApi = createApi({
  reducerPath: "fetchReviews",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    fetchReviews: builder.query<Review[], string>({
      query: (gigId) => {
        return {
          url: `/reviews/${gigId}`,
        }
      },
      // Provides a list of `Reviews` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Reviews` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Reviews', id: _id } as const)),
              { type: 'Reviews', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Reviews', id: 'LIST' }],
    }),
    addReview: builder.mutation<Review, Partial<Review>>({
      query(body) {
        return {
          url: `/reviews/`,
          method: 'POST',
          body,
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Reviews', id: 'LIST' }],
    }),
  }),
});

// return `gigs?${search}${search == "" ? "" : "&"}min=${!min ? "" : min}&max=${!max ? "" : max}&sort=${sort}`;
export const { useFetchReviewsQuery, useAddReviewMutation } = reviewsApi;