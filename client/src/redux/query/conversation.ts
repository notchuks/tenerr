import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Conversation } from '../../utils/types';

export const conversationApi = createApi({
  reducerPath: "fetchConversations",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  tagTypes: ["Conversations"],
  endpoints: (builder) => ({
    fetchConversations: builder.query<Conversation[], void>({
      query: () => {
        return {
          url: `/conversations/`,
        }
      },
      // Provides a list of `Conversations` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Conversation` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ _id }) => ({ type: 'Conversations', id: _id } as const)),
              { type: 'Conversations', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Conversations', id: 'LIST' }],
    }),
    updateConversation: builder.mutation<Conversation, string>({
      query(convoId) {
        return {
          url: `/conversations/${convoId}`,
          method: 'PUT'
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Conversations', id: 'LIST' }],
    }),
  }),
});

// return `gigs?${search}${search == "" ? "" : "&"}min=${!min ? "" : min}&max=${!max ? "" : max}&sort=${sort}`;
export const { useFetchConversationsQuery, useUpdateConversationMutation } = conversationApi;