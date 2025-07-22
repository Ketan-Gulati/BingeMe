// src/Redux/slice/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'dark', // default theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
