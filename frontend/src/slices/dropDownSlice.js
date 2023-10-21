import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dropDown: false,
};

const dropDownSlice = createSlice({
  name: 'dropDown',
  initialState,
  reducers: {
    toggledropDown: (state) => {
      state.dropDown = !state.dropDown;
    },
  },
});

export const { toggledropDown } = dropDownSlice.actions;

export default dropDownSlice.reducer;
