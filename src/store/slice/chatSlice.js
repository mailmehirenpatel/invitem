// 3rd Party Imports
import {createSlice} from '@reduxjs/toolkit';

// Initial State
const initialState = {
  chatData: null,
  imageData: [],
};

// Create Slice For Profile
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    onChatData: (state, action) => {
      state.chatData = action.payload?.result;
    },
    onImageData: (state, action) => {
      state.imageData = action.payload;
    },
  },
});

export const {onChatData, onImageData} = chatSlice.actions;
export default chatSlice.reducer;
