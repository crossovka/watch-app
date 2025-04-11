'use server';

import { cookies } from 'next/headers';
import { API_URL } from '@/config/api.config';

export async function fetchFavoriteSlugsServer(): Promise<string[]> {
	const cookieStore = cookies();
	const token = cookieStore.get('access_token')?.value;

	if (!token) return [];

	const res = await fetch(`${API_URL}/user/favorites?perPage=1000&page=1`, {
		headers: {
			Cookie: `access_token=${token}`,
		},
		cache: 'no-store',
		credentials: 'include',
	});

	if (!res.ok) {
		console.error('Ошибка при получении избранных:', res.status);
		return [];
	}

	const data = await res.json();
	return data.data.map((movie: { slug: string }) => movie.slug);
}
