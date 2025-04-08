import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_URL } from '@/config/api.config';
import { MovieCard } from '@/components/elements/MovieCard';
import { Pagination } from '@/components/modules/Pagination';

export default async function FavoritesPage() {
	const cookieStore = await cookies(); // обязательно await
	const token = cookieStore.get('access_token')?.value;

	if (!token) {
		redirect('/login');
	}

	const page = 1;
	const perPage = 2;

	const res = await fetch(
		`${API_URL}/user/favorites?page=${page}&perPage=${perPage}`,
		{
			method: 'GET',
			headers: {
				// Поставим куку вручную, если backend только так её и ожидает
				Cookie: `access_token=${token}`,
			},
			cache: 'no-store',
			credentials: 'include', // на всякий, чтобы отправлялись куки
		}
	);

	// if (!res.ok) return <p>Ошибка при загрузке</p>;
	if (!res.ok) {
		const error = await res.text();
		console.error('Ошибка запроса:', res.status, error);
		return <p>Ошибка при загрузке</p>;
	}

	const favorites = await res.json();

	return (
		<main>
			<h1>Избранные фильмы</h1>
			<div>
				{favorites?.data?.map?.((movie) => (
					<MovieCard key={movie.slug} {...movie} />
				)) ?? <p>Нет избранных фильмов</p>}
			</div>

			<Pagination page={favorites.page} totalPages={favorites.totalPages} />
		</main>
	);
}
