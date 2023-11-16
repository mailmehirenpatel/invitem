// 3rd Party Imports
import {createSlice} from '@reduxjs/toolkit';

// Initial State
const initialState = {
  profileData: null,
  userInfo: null,
};

// Create Slice For Profile
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    onProfileData: (state, action) => {
      state.profileData = action.payload?.result;
    },
    onUserInfo: (state, action) => {
      state.userInfo = action.payload?.result;
    },
  },
});

export const {onProfileData} = profileSlice.actions;
export default profileSlice.reducer;
