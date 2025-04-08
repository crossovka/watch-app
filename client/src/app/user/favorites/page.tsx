import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { getBaseUrl } from '@/lib/utils/get-base-url';
import { fetchFavorites } from '@/lib/api/user/fetch-favorites';

import { MovieCard } from '@/components/elements/MovieCard';
import { Pagination } from '@/components/modules/Pagination';

type FavoritesPageProps = {
	searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({ searchParams }: FavoritesPageProps) {
	const page = Number(searchParams.page ?? 1);
	const baseUrl = await getBaseUrl('/user/favorites');
	const canonical = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;

	return {
		title: `Избранные фильмы – страница ${page}`,
		description: `Ваш список избранных фильмов. Страница ${page}`,
		alternates: {
			canonical,
		},
	};
}

export default async function FavoritesPage({
	searchParams,
}: FavoritesPageProps) {
	const token = cookies().get('access_token')?.value;

	if (!token) {
		redirect('/login');
	}

	const page = Number(searchParams.page ?? 1);
	const perPage = 1;

	let favorites;
	try {
		favorites = await fetchFavorites({ token, page, perPage });
	} catch (err) {
		console.error(err);
		return <p>Ошибка при загрузке</p>;
	}

	return (
		<main>
			<h1>Избранные фильмы</h1>
			<div>
				{favorites.data.length > 0 ? (
					favorites.data.map((movie) => (
						<MovieCard key={movie.slug} {...movie} />
					))
				) : (
					<p>Нет избранных фильмов</p>
				)}
			</div>

			<Pagination page={favorites.page} totalPages={favorites.totalPages} />
		</main>
	);
}
