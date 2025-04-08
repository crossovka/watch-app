import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IUser, LoginPayload, RegisterPayload } from './auth.types';

const BASE_URL = '/api';

// Логин
export const loginThunk = createAsyncThunk(
	'auth/login',
	async (data: LoginPayload, thunkAPI) => {
		try {
			const response = await fetch(`${BASE_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include', // ОБЯЗАТЕЛЬНО: чтобы кука пришла с сервера
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const message = (await response.json())?.message || 'Ошибка входа';
				throw new Error(message);
			}

			const { user } = await response.json();

			toast.success('Успешный вход!');
			return { ...user }; // токен не нужен — он уже в куке
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Ошибка при входе';
			toast.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

// Регестрация
export const registerThunk = createAsyncThunk(
	'auth/register',
	async (data: RegisterPayload, thunkAPI) => {
		try {
			const response = await fetch(`${BASE_URL}/user/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include', // нужно, если ты на бэке сразу логинишь
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const message =
					(await response.json())?.message || 'Ошибка регистрации';
				throw new Error(message);
			}

			const { user } = await response.json(); // предполагаем, что структура та же

			toast.success('Регистрация прошла успешно!');
			return user;
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Ошибка при регистрации';
			toast.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const logoutThunk = createAsyncThunk(
	'auth/logout',
	async (_, thunkAPI) => {
		try {
			await fetch(`${BASE_URL}/auth/logout`, {
				method: 'POST',
				credentials: 'include',
			});
			toast.success('Вы вышли из аккаунта');
			return null;
		} catch (err) {
			const message = err instanceof Error ? err.message : 'Ошибка при выходе';
			toast.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);
