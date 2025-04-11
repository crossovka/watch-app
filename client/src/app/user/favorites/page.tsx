import { redirect } from 'next/navigation';

import { getBaseUrl } from '@/lib/utils/get-base-url';
import { fetchFavoritesServer } from '@/lib/api/user/fetch-favorites.server';

import { Pagination } from '@/components/modules/Pagination';
import { FavoriteList } from '@/components/modules/FavoriteList';
import { MovieMinimal } from '@/@types/movie.types';

type FavoritesPageProps = {
	searchParams: { [key: string]: string | undefined };
};

type FavoritesResponse = {
	data: MovieMinimal[];
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
};

export async function generateMetadata({ searchParams }: FavoritesPageProps) {
	const page = Number(searchParams.page ?? 1);
	const baseUrl = await getBaseUrl('/user/favorites');
	const canonical = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;

	return {
		title: `Избранные фильмы – страница ${page}`,
		description: `Ваш список избранных фильмов. Страница ${page}`,
		alternates: { canonical },
	};
}

export default async function FavoritesPage({
	searchParams,
}: FavoritesPageProps) {
	const page = Number(searchParams.page ?? 1);
	const perPage = 10;

	let favorites: FavoritesResponse;

	try {
		favorites = await fetchFavoritesServer({ page, perPage });
	} catch (err: unknown) {
		if (err instanceof Error && err.message === 'Не авторизован') {
			redirect('/login');
		}

		console.error(err);
		return <p>Ошибка при загрузке</p>;
	}

	// Добавляем isFavorite: true к каждому фильму потому что это уже страница избранных фильмов
	const movies = favorites.data.map((movie) => ({
		...movie,
		isFavorite: true,
	}));

	return (
		<main>
			<h1>Избранные фильмы</h1>
			<FavoriteList initialMovies={movies} />
			<Pagination page={favorites.page} totalPages={favorites.totalPages} />
		</main>
	);
}
