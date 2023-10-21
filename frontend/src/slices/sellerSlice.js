import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
});

//export const { } = productSlice.actions;

export default sellerSlice.reducer;
