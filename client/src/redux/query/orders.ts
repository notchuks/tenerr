import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Order } from '../../utils/types';

// Not 
type Intent = {
  clientSecret: string;
}

type Update = {
  payment_intent: string;
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
    updateOrder: builder.mutation<string, Update>({
      query(body) {
        return {
          url: `/orders/`,
          method: 'PUT',
          body
        }
      },
    }),
  }),
});

export const { useFetchOrdersQuery, useCreatePaymentMutation, useUpdateOrderMutation } = ordersApi;