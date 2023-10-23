import { apiSlice } from "./apiSlice";
import { server } from "../../server";
const USERS_URL = "/api/v2/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${server}${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${server}${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    creatUser: builder.mutation({
      query: (data) => ({
        url: `${server}${USERS_URL}/create-user`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${server}${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: `${server}${USERS_URL}/profile`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${server}${USERS_URL}/profile`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    updateImage: builder.mutation({
      query: (data) => ({
        url: `${server}/uploadImage`,
        method: "PUT",
        body: data,
      }),
    }),
    updateUserAdresses: builder.mutation({
      query: (data) => ({
        url: `${server}${USERS_URL}/update-user-addresses`,
        method: "PUT",
        body: data,
      }),
    }),
    deletUserAdress: builder.mutation({
      query: (id) => ({
        url: `${server}${USERS_URL}/delete-user-address/${id}`,
        method: "DELETE",
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${server}${USERS_URL}/update-user-password`,
        method: "PUT",
        body: data,
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${server}${USERS_URL}/user-info/${id}`,
        method: "GET",
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: `${server}${USERS_URL}/admin-all-users`,
        method: "GET",
      }),
    }),

    deletUserById: builder.mutation({
      query: (id) => ({
        url: `${server}${USERS_URL}/delete-user//${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useCreatUserMutation,
  useUpdateImageMutation,
  useUpdateUserAdressesMutation,
  useDeletUserAdressMutation,
  useUpdatePasswordMutation,
  useDeletUserByIdMutation,
  useLoadUserQuery,
  useGetUserByIdQuery,
  useGetAllUserQuery,
} = userApiSlice;
