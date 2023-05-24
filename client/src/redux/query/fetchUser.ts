import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../user/userSlice';

export const userApi = createApi({
  reducerPath: "fetchUser",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query<User, string>({
      query: (userId) => {
        return {
          url: `/users/get/${userId}`,
        }
      },
    }),
  }),
});

// return `gigs?${search}${search == "" ? "" : "&"}min=${!min ? "" : min}&max=${!max ? "" : max}&sort=${sort}`;
export const { useFetchUserQuery } = userApi;