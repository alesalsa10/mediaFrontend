import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isLight: JSON.parse(localStorage.getItem('isLight')) || false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isLight = !state.isLight;
      localStorage.setItem('isLight', state.isLight);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
