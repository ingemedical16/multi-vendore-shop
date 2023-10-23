import { apiSlice } from "./apiSlice";
import { server } from "../../server";
const ROOT_URL = "/api/v2/message";

export const coupounCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data) => ({
        url: `${server}${ROOT_URL}/create-new-message`,
        method: "POST",
        body: data,
      }),
    }),
    getAllMessages: builder.query({
      query: () => ({
        url: `${server}${ROOT_URL}/get-all-messages/:id`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useGetAllMessagesQuery } =
  coupounCodeApiSlice;
