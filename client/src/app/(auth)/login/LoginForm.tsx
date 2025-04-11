'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/redux/store';
import { loginThunk } from '@/redux/slices/auth/auth.asyncActions';

import styles from './login.module.scss';

const schema = yup.object({
	email: yup.string().email('Невалидный email').required('Обязательное поле'),
	password: yup
		.string()
		.min(6, 'Минимум 6 символов')
		.required('Обязательное поле'),
});

type LoginFormData = yup.InferType<typeof schema>;

export default function LoginForm() {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			await dispatch(loginThunk(data)); // просто диспатчим без unwrap
			reset();
			// window.location.href = '/'; // редирект
			window.location.href = '/movies'; // редирект
		} catch (error) {
			toast.error(error as string); // если вдруг что-то бросит, логируем
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<label>
				Email:
				<input {...register('email')} />
				{errors.email && <span>{errors.email.message}</span>}
			</label>

			<label>
				Пароль:
				<input type="password" {...register('password')} />
				{errors.password && <span>{errors.password.message}</span>}
			</label>

			<button type="submit">Войти</button>
		</form>
	);
}
