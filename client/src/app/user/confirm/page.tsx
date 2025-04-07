'use client';

import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { API_URL } from '@/config/api.config';

export default function ConfirmPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const [message, setMessage] = useState('Проверка...');

	useEffect(() => {
		if (!token) return;

		const confirmEmail = async () => {
			try {
				const response = await axios.get(
					`${API_URL}/user/confirm?token=${token}`
				);
				setMessage(response.data.message);
			} catch (error) {
				const err = error as AxiosError<{ message: string }>;
				setMessage(err.response?.data?.message || 'Ошибка подтверждения');
			}
		};

		confirmEmail();
	}, [token]);

	return <p>{message}</p>;
}
