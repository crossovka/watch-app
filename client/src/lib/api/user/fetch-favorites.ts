import { API_URL } from '@/config/api.config';

type FetchFavoritesParams = {
	token: string;
	page: number;
	perPage: number;
};

export async function fetchFavorites({
	token,
	page,
	perPage,
}: FetchFavoritesParams) {
	const res = await fetch(
		`${API_URL}/user/favorites?page=${page}&perPage=${perPage}`,
		{
			method: 'GET',
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
