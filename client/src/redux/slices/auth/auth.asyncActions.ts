import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { IUser, LoginPayload, RegisterPayload } from './auth.types';

import { API_URL } from '@/config/api.config';

// Логин
export const loginThunk = createAsyncThunk(
	'auth/login', // Название для экшена
	async (data: LoginPayload, thunkAPI) => {
		try {
			// Выполняем запрос на сервер для авторизации
			const response = await fetch(`${API_URL}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			// Проверка на успешный ответ
			if (!response.ok) {
				const message = (await response.json())?.message || 'Ошибка входа';
				throw new Error(message); // Выводим ошибку, если ответ неудачный
			}

			// Если логин успешен, получаем данные пользователя
			const userData: IUser = await response.json();

			// Если в ответе есть токен, сохраняем его в localStorage
			if (userData.access_token) {
				localStorage.setItem('token', userData.access_token);
			}

			// Успешный вход - показываем уведомление
			toast.success('Успешный вход!');

			// Возвращаем данные пользователя, чтобы они обновили состояние в Redux
			return userData;
		} catch (err) {
			// Обработка ошибок при запросе
			const message = err instanceof Error ? err.message : 'Ошибка при входе';
			toast.error(message); // Показываем ошибку в уведомлении
			return thunkAPI.rejectWithValue(message); // Возвращаем ошибку для обработки в редьюсере
		}
	}
);

// Регестрация
export const registerThunk = createAsyncThunk(
	'auth/register',
	async (data: RegisterPayload, thunkAPI) => {
		try {
			const response = await fetch(`${API_URL}/user/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const message =
					(await response.json())?.message || 'Ошибка регистрации';
				throw new Error(message);
			}

			const userData: IUser = await response.json();

			// Если токен возвращается при регистрации, его можно сохранить аналогично
			if (userData.token) {
				localStorage.setItem('token', userData.token);
			}

			toast.success('Регистрация прошла успешно!');
			return userData;
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Ошибка при регистрации';
			toast.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);
