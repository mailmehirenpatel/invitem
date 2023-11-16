// 3rd Party Imports
import {createSlice} from '@reduxjs/toolkit';

// Initial State
const initialState = {
  eventData: null,
  locationData: null,
  upcomingEventData: null,
  categoryData: null,
  inviteUserData: null,
  registerUserData: null,
  eventParticipant: null,
  joinEventData: null,
  eventScheduleList: null,
  isMute: false,
  eventObjectData: {},
};

// Create Slice For Event
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    onEventData: (state, action) => {
      state.eventData = action.payload?.result;
    },
    onUpcomingEventData: (state, action) => {
      state.upcomingEventData = action.payload?.result;
    },
    onEventScheduleList: (state, action) => {
      state.eventScheduleList = action.payload?.result;
    },
    onEventObjectData: (state, action) => {
      state.eventObjectData = action.payload?.result[0];
    },
    onLocationData: (state, action) => {
      state.locationData = action.payload?.result;
    },
    onCategoryData: (state, action) => {
      state.categoryData = action.payload?.result;
    },
    onRegisterUserData: (state, action) => {
      state.registerUserData = action.payload?.result;
    },
    onJoinEventData: (state, action) => {
      state.joinEventData = action.payload?.result;
    },
    onMute: (state, action) => {
      state.isMute = action.payload;
    },
  },
});

export const {
  onEventData,
  onLocationData,
  onCategoryData,
  onRegisterUserData,
  onEventObjectData,
  onUpcomingEventData,
  onEventScheduleList,
  onMute,
} = eventSlice.actions;
export default eventSlice.reducer;
