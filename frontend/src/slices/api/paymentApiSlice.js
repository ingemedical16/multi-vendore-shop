import { apiSlice } from './apiSlice';
const ROOT_URL = '/api/v2/payment';

export const coupounCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    processPayment: builder.mutation({
      query: (data) => ({
        url: `${ROOT_URL}/process`,
        method: 'POST',
        body: data,
      }),
    }),
    stripeapikey: builder.query({
      query: () => ({
        url: `${ROOT_URL}/stripeapikey`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useStripeapikeyQuery,
  useProcessPaymentMutation,
} = coupounCodeApiSlice;
