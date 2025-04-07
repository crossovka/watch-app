'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { useAppDispatch } from '@/redux/store';
import { registerThunk } from '@/redux/slices/auth/auth.asyncActions';

import styles from './register.module.scss';

const schema = yup.object({
	name: yup.string().required('Имя обязательно'),
	email: yup.string().email('Невалидный email').required('Email обязателен'),
	password: yup
		.string()
		.min(6, 'Минимум 6 символов')
		.required('Пароль обязателен'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароли не совпадают')
		.required('Подтверждение пароля обязательно'),
});

type RegisterFormData = yup.InferType<typeof schema>;

export default function RegisterForm() {
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<RegisterFormData>({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: RegisterFormData) => {
		try {
			await dispatch(
				registerThunk({
					name: data.name,
					email: data.email,
					password: data.password,
				})
			);
			reset();
			window.location.href = '/register/verify';
		} catch (error) {
			toast.error(error as string);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<label>
				Имя:
				<input {...register('name')} />
				{errors.name && <span>{errors.name.message}</span>}
			</label>

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

			<label>
				Подтвердите пароль:
				<input type="password" {...register('confirmPassword')} />
				{errors.confirmPassword && (
					<span>{errors.confirmPassword.message}</span>
				)}
			</label>

			<button type="submit">Зарегистрироваться</button>
		</form>
	);
}
