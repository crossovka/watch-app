import { getBaseUrl } from '@/lib/utils/get-base-url';
import { getMovies } from '@/lib/api/movies/get-movies';
import { MoviesList } from '@/components/modules/MoviesList';
import { MovieMinimal } from '@/@types/movie.type';

type MoviesPageProps = {
	searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({ searchParams }: MoviesPageProps) {
	const page = Number(searchParams.page ?? 1);
	const baseUrl = await getBaseUrl('/movies');
	const canonical = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;

	return {
		title: `Фильмы – страница ${page}`,
		description: `Список всех фильмов. Страница ${page}`,
		alternates: {
			canonical,
		},
	};
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
	const page = Number(searchParams.page ?? 1);
	const perPage = 5;

	try {
		const moviesData = await getMovies(page, perPage);

		return (
			<MoviesList
				initialMovies={moviesData.items as MovieMinimal[]}
				page={moviesData.page}
				totalPages={moviesData.totalPages}
			/>
		);
	} catch (error) {
		console.error('Ошибка при загрузке фильмов:', error);
		return <p>Ошибка при загрузке фильмов</p>;
	}
}
