import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../../utils/types';

// Not 
type Intent = {
  clientSecret: string;
}

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
    createPayment: builder.mutation<Intent, string>({
      query(gigId) {
        return {
          url: `/orders/create-payment-intent/${gigId}`,
          method: 'POST',
        }
      },
    }),
  }),
});

export const { useFetchOrdersQuery, useCreatePaymentMutation } = ordersApi;