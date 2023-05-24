import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../../utils/types';

export const ordersApi = createApi({
  reducerPath: "fetchOrders",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include"
  }),
  endpoints: (builder) => ({
    fetchOrders: builder.query<Order[], void>({
      query: () => {
        return {
          url: `/orders/`,
        }
      },
    }),
  }),
});

export const { useFetchOrdersQuery } = ordersApi;