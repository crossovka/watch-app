import { API_URL } from '@/config/api.config';
import { MovieMinimal } from '@/@types/movie.type';

type GetMoviesResponse = {
	items: MovieMinimal[];
	total: number;
	page: number;
	perPage: number;
};

export async function getMovies(
	page = 1,
	perPage = 3
): Promise<GetMoviesResponse> {
	const res = await fetch(`${API_URL}/movies?page=${page}&perPage=${perPage}`, {
		next: { revalidate: 0 },
	});

	if (!res.ok) {
		throw new Error(`Ошибка при получении фильмов: ${res.status}`);
	}

	const json = await res.json();

	console.log('Ответ от /movies', json);

	return json;
}
