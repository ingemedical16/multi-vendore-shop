import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isLoading:false,
  allProducts:[],
  error:null,
  products:[],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    }, 
    setProducts: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    }, 
    loadingData: (state, action) => {
      state.isLoading =  action.payload;
    }, 
    setErrors:(state, action) => {
      state.error =  action.payload;
    }, 
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {setAllProducts,setProducts,setErrors,clearErrors,loadingData } = productSlice.actions;

export default productSlice.reducer;
