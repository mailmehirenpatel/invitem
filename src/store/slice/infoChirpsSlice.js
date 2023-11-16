// 3rd Party Imports
import {createSlice} from '@reduxjs/toolkit';

// Initial State
const initialState = {
  infoChirpsData: null,
  EventInfoChirpsData: null,
  WebSiteLinksData: null,
};

// Create Slice For Profile
const infoChirpsSlice = createSlice({
  name: 'infoChirps',
  initialState,
  reducers: {
    onInfoChirpsData: (state, action) => {
      state.infoChirpsData = action.payload?.result;
    },
    onEventInfoChirpsData: (state, action) => {
      state.EventInfoChirpsData = action.payload?.result;
    },
    onWebSiteGetData: (state, action) => {
      state.WebSiteLinksData = action.payload?.result;
    },
  },
});

export const {onInfoChirpsData, onEventInfoChirpsData, onWebSiteGetData} =
  infoChirpsSlice.actions;
export default infoChirpsSlice.reducer;
