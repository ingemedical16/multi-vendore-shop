import { apiSlice } from './apiSlice';
const CONVERSATION_URL = '/api/v2/conversation';

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewConversation: builder.mutation({
      query: (data) => ({
        url: `${CONVERSATION_URL}/create-new-conversation`,
        method: 'POST',
        body: data,
      }),
    }),
    getSellerConverstionByuserId: builder.query({
      query: () => ({
        url: `${CONVERSATION_URL}/get-all-conversation-seller/:id`,
        method: 'GET',
      }),
    }),
    getUserConverstionByuserId: builder.query({
      query: () => ({
        url: `${CONVERSATION_URL}/get-all-conversation-user/:id`,
        method: 'GET',
      }),
    }),
    updateLastMessageById: builder.mutation({
      query: (data) => ({
        url: `${CONVERSATION_URL}/update-last-message/:id`,
        method: 'PUT',
        credentials: 'include',
        body: data,
      }),
    }),
    
  }),
});

export const {
  useCreateNewConversationMutation,
  useGetSellerConverstionByuserIdQuery,
  useGetUserConverstionByuserIdQuery,
  useUpdateLastMessageByIdMutation
} = conversationApiSlice;
