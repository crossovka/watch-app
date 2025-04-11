'use server';

import { cookies } from 'next/headers';
import { API_URL } from '@/config/api.config';

type FetchFavoritesParams = {
	page: number;
	perPage: number;
};

export async function fetchFavoritesServer({
	page,
	perPage,
}: FetchFavoritesParams) {
	const cookieStore = cookies();
	const token = cookieStore.get('access_token')?.value;

	if (!token) throw new Error('Не авторизован');

	const res = await fetch(
		`${API_URL}/user/favorites?page=${page}&perPage=${perPage}`,
		{
			headers: {
				Cookie: `access_token=${token}`,
			},
			cache: 'no-store',
			credentials: 'include',
		}
	);

	if (!res.ok) {
		const error = await res.text();
		throw new Error(`Ошибка запроса: ${res.status} - ${error}`);
	}

	return res.json();
}
