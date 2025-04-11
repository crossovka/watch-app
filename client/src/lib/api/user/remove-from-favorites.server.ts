'use server';

import { cookies } from 'next/headers';
import { API_URL } from '@/config/api.config';

export async function removeFromFavoritesServerAction(slug: string) {
	const cookieStore = cookies();
	const token = cookieStore.get('access_token')?.value;

	if (!token) throw new Error('Не авторизован');

	const res = await fetch(`${API_URL}/user/favorites/${slug}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `access_token=${token}`,
		},
		cache: 'no-store',
	});

	if (!res.ok) {
		const errorData = await res.json();
		throw new Error(
			errorData.message || 'Ошибка удаления фильма из избранного'
		);
	}

	return await res.json();
}
