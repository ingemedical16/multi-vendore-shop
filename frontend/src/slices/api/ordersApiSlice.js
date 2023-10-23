import { apiSlice } from "./apiSlice";
import { server } from "../../server";
const ORDERS_URL = "/api/v2/order";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrdrs: builder.query({
      query: (userId) => ({
        url: `${server}${ORDERS_URL}/get-all-orders/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getShopOrdrsById: builder.query({
      query: (shopId) => ({
        url: `${server}${ORDERS_URL}/get-seller-all-orders/${shopId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${server}${ORDERS_URL}/admin-all-orders`,
        method: "GET",
        credentials: "include",
      }),
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: `${server}${ORDERS_URL}/create-order`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: (data) => ({
        url: `${server}${ORDERS_URL}/update-order-status/${data._id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    giveRefund: builder.mutation({
      query: (id, data) => ({
        url: `${server}${ORDERS_URL}/order-refund/${id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    acceptRefund: builder.mutation({
      query: (data) => ({
        url: `${server}${ORDERS_URL}/order-refund-success/${data._id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserOrdrsQuery,
  useGetOrdersQuery,
  useGetShopOrdrsByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useGiveRefundMutation,
  useAcceptRefundMutation,
} = orderApiSlice;
