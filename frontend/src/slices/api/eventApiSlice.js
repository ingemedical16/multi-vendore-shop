import { apiSlice } from "./apiSlice";
import {server} from '../../server'
const EVENTS_URL = "/api/v2/event";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => ({
        url: `${server}${EVENTS_URL}/get-all-events`,
        method: "GET",
      }),
    }),
    getAllEventsByShop: builder.query({
      query: () => ({
        url: `${server}${EVENTS_URL}/get-all-events/:id`,
        method: "GET",
      }),
    }),
    getEvents: builder.query({
      query: () => ({
        url: `${server}${EVENTS_URL}/admin-all-events`,
        method: "GET",
      }),
    }),
    createEvent: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/create-event`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
    deleteShopEventById: builder.mutation({
      query: (data) => ({
        url: `${server}${EVENTS_URL}/delete-shop-event/:id`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetAllEventsByShopQuery,
  useGetEventsQuery,
  useCreateEventMutation,
  useDeleteShopEventByIdMutation,
} = orderApiSlice;
