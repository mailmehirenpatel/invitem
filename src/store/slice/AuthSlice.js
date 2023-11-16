// 3rd Party Imports
import {createSlice} from '@reduxjs/toolkit';

// Initial State
const initialState = {
  token: null,
  userId: 0,
  userMpin: null,
  userData: null,
  isLogin: false,
  isUser: true,
  isFirstTime: true,
};

// Create Slice for Login
const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogout: () => {
      return initialState;
    },
    onSignIn: (state, action) => {
      state.token = action.payload?.data?.result?.token;
      state.isUser =
        action.payload?.data?.result?.roleName === 'Admin' ? false : true;
      state.userData = action.payload?.data?.result;
      state.userId = action.payload?.data?.result?.userId;
      state.userMpin = action.payload?.data?.result?.mPin;
      state.isLogin = action.payload?.data?.result;
    },
    onSetMpin: (state, action) => {
      state.userMpin = action.payload;
    },
    onIsFirstTime: (state, action) => {
      state.isFirstTime = action.payload;
    },
  },
});

export const {onLogout, onSignIn, onSetMpin, onIsFirstTime} =
  loginSlice.actions;
export default loginSlice.reducer;
