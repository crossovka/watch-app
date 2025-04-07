import { createSlice } from '@reduxjs/toolkit';
import { AuthState, IUser } from './auth.types';
import { loginThunk, registerThunk } from './auth.asyncActions';

const initialState: AuthState = {
	user: null,
	isLoading: false,
	error: null,
};

// Загружаем токен из localStorage при инициализации, только если мы на клиенте
let initialUser: IUser | null = null;

if (typeof window !== 'undefined') {
	const tokenFromStorage = localStorage.getItem('token');
	initialUser = tokenFromStorage
		? { access_token: tokenFromStorage, id: 0, name: '', email: '' }
		: null;
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		...initialState,
		user: initialUser, // Загружаем токен из localStorage
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			localStorage.removeItem('token'); // Удаляем токен из localStorage при выходе
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginThunk.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.user = action.payload; // Токен сохраняется в Redux
				state.isLoading = false;
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			.addCase(registerThunk.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerThunk.fulfilled, (state, action) => {
				state.user = action.payload; // Токен сохраняется в Redux
				state.isLoading = false;
			})
			.addCase(registerThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const authActions = {
	...authSlice.actions,
	loginThunk,
	registerThunk,
};
export default authSlice.reducer;
