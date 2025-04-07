import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeState } from './theme.types';

const initialState: ThemeState = {
	mode: 'light',
};

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.mode = state.mode === 'light' ? 'dark' : 'light';
		},
		setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
			state.mode = action.payload;
		},
	},
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
