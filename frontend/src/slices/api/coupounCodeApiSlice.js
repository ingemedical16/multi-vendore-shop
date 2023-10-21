import { apiSlice } from './apiSlice';
const ROOT_URL = '/api/v2/coupon';

export const coupounCodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCouponCode: builder.mutation({
      query: (data) => ({
        url: `${ROOT_URL}/create-coupon-code`,
        method: 'POST',
        body: data,
      }),
    }),
    getAllCouponsByShop: builder.query({
      query: () => ({
        url: `${ROOT_URL}//get-coupon/:id`,
        method: 'GET',
      }),
    }),
    getCouponsByName: builder.query({
      query: () => ({
        url: `${ROOT_URL}//get-coupon-value/:name`,
        method: 'GET',
      }),
    }),
    deleteCoupon: builder.mutation({
      query: (data) => ({
        url: `${ROOT_URL}/delete-coupon/:id`,
        method: 'DELETE',
        credentials: 'include',
        body: data,
      }),
    }),
    
  }),
});

export const {
  useCreateCouponCodeMutation,
  useDeleteCouponMutation,
  useGetAllCouponsByShopQuery,
  useGetCouponsByNameQuery
} = coupounCodeApiSlice;
