import { apiSlice } from "./apiSlice";
import { server } from "../../server";
const ROOT_URL = "/api/v2/withdraw";

export const coupounCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWithdraw: builder.mutation({
      query: (data) => ({
        url: `${server}${ROOT_URL}/create-withdraw-request`,
        method: "POST",
        body: data,
      }),
    }),
    updateWithdrawById: builder.mutation({
      query: (data) => ({
        url: `${server}${ROOT_URL}/update-withdraw-request/:id`,
        method: "PUT",
        body: data,
      }),
    }),
    getAllWithdraw: builder.query({
      query: () => ({
        url: `${server}${ROOT_URL}/get-all-withdraw-request`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateWithdrawMutation,
  useUpdateWithdrawByIdMutation,
  useGetAllWithdrawQuery,
} = coupounCodeApiSlice;
