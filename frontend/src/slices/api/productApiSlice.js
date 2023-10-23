/* eslint-disable no-unused-vars */
import { apiSlice } from "./apiSlice";
import { server } from "../../server";
const ROOT_URL = "/api/v2/product";

export const coupounCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${server}${ROOT_URL}/create-product`,
        method: "POST",
        body: data,
      }),
    }),
    getShopProductsByShopId: builder.query({
      query: (id) => ({
        url: `${server}${ROOT_URL}/get-all-products-shop/${id}`,
        method: "GET",
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: `${server}${ROOT_URL}/get-all-products`,
        method: "GET",
      }),
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${server}${ROOT_URL}/${id}`,
        method: "GET",
      }),
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `${server}${ROOT_URL}/admin-all-products`,
        method: "GET",
      }),
    }),
    deleteProductById: builder.mutation({
      query: (data) => ({
        url: `${server}${ROOT_URL}/delete-shop-product/:id`,
        method: "DELETE",
        credentials: "include",
        body: data,
      }),
    }),
    createProductReview: builder.mutation({
      query: (data) => ({
        url: `${server}${ROOT_URL}/create-new-review`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useCreateProductReviewMutation,
  useDeleteProductByIdMutation,
  useGetShopProductsByShopIdQuery,
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = coupounCodeApiSlice;
