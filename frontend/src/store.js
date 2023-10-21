import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import sellerReducer from "./slices/sellerSlice";
import wishlistReducer from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import dropDownReducer from "./slices/dropDownSlice";
import eventReducer from  './slices/eventSlice'

import { apiSlice } from "./slices/api/apiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: authReducer,
    seller: sellerReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    events:eventReducer,
    cart: cartReducer,
    order: orderReducer,
    dropDown:dropDownReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
