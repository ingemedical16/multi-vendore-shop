import { apiSlice } from "./apiSlice";
import { server } from "../../server";
const ROOT_URL = "/api/v2/payment";

export const coupounCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    processPayment: builder.mutation({
      query: (data) => ({
        url: `${server}${ROOT_URL}/process`,
        method: "POST",
        body: data,
      }),
    }),
    stripeapikey: builder.query({
      query: () => ({
        url: `${server}${ROOT_URL}/stripeapikey`,
        method: "GET",
      }),
    }),
  }),
});

export const { useStripeapikeyQuery, useProcessPaymentMutation } =
  coupounCodeApiSlice;
