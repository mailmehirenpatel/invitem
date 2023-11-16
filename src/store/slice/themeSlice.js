/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
// 3rd Party Imports
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Initial State
const initialState = {
  isDark: false,
};

// Create Slice Fore Theme
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setIsDarkTheme: (state, action) => {
      return {
        ...state,
        isDark: action.payload,
      };
    },
  },
});

export const {setIsDarkTheme} = themeSlice.actions;
export default themeSlice.reducer;
