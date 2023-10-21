/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).user
    : null,
  isAuthenticated: localStorage.getItem('userInfo') ? true : false,
  token: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')).token
    : null,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('userInfo');
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const updateuserInfo = {
        ...userInfo,
        user: action.payload.user,
      };
      localStorage.setItem('userInfo', JSON.stringify(updateuserInfo));
    },
  },
});

export const { setCredentials, logout,updateUser } = authSlice.actions;

export default authSlice.reducer;
