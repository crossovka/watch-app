import { getBaseUrl } from '@/lib/utils/get-base-url';
import { getMovies } from '@/lib/api/movies/get-movies';
import { MovieCard } from '@/components/elements/MovieCard';
import { Pagination } from '@/components/modules/Pagination';

type HomePageProps = {
	searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({ searchParams }: HomePageProps) {
	const page = Number(searchParams.page ?? 1);
	const baseUrl = await getBaseUrl('/');
	const canonical = page === 1 ? baseUrl : `${baseUrl}?page=${page}`;

	return {
		title: `Фильмы – страница ${page}`,
		description: `Список всех фильмов. Страница ${page}`,
		alternates: {
			canonical,
		},
	};
}

export default async function Home({ searchParams }: HomePageProps) {
	const page = Number(searchParams.page ?? 1);
	const perPage = 3;

	let moviesData;

	try {
		moviesData = await getMovies(page, perPage);
	} catch (error) {
		console.error('Ошибка при загрузке фильмов:', error);
		return <p>Ошибка при загрузке фильмов</p>;
	}

	const movies = moviesData.items;

	return (
		<main>
			<h1>Фильмы</h1>

			<div className="grid gap-4 mt-4">
				{movies.length > 0 ? (
					movies.map((movie) => <MovieCard key={movie.slug} {...movie} />)
				) : (
					<p>Фильмы не найдены</p>
				)}
			</div>

			<Pagination page={moviesData.page} totalPages={moviesData.totalPages} />
		</main>
	);
}
