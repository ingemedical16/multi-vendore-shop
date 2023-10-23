import { apiSlice } from './apiSlice';
import {server} from '../../server'
const EVENTS_URL = '/api/v2/shop';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSeller: builder.query({
      query: () => ({
        url: `${server}${EVENTS_URL}/getSeller`,
        method: 'GET',
      }),
    }),
    shopLogout: builder.query({
      query: () => ({
        url: `${server}${EVENTS_URL}/logout`,
        method: 'GET',
      }),
    }),
    getShopInfoById: builder.query({
      query: () => ({
        url: `${server}${EVENTS_URL}/get-shop-info/:id`,
        method: 'GET',
      }),
    }),
    getAllSeller: builder.query({
      query: () => ({
        url: `${server}${EVENTS_URL}/admin-all-sellers`,
        method: 'GET',
      }),
    }),
    createShop: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/create-shop`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
    activateShop: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/activation`,
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    loginShop: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/login-shop`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
    deleteSellerById: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/delete-seller/:id`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
    deleteWithdrawMethod: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/delete-withdraw-method`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
    updateSellerInfo: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/update-seller-info`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
    updateShopAvatar: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/update-shop-avatar`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
    updatePaymentMethods: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/update-payment-methods`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateShopMutation,
  useActivateShopMutation,
  useLoginShopMutation,
  useUpdateShopAvatarMutation,
  useUpdateSellerInfoMutation,
  useUpdatePaymentMethodsMutation,
  useDeleteSellerByIdMutation,
  useDeleteWithdrawMethodMutation,
  useGetSellerQuery,
  useShopLogoutQuery,
  useGetShopInfoByIdQuery,
  useGetAllSellerQuery,
} = orderApiSlice;
