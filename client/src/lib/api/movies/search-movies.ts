import { API_URL } from '@/config/api.config';
import { MovieMinimal } from '@/@types/movie.types';

export const searchMovies = async (title: string): Promise<MovieMinimal[]> => {
	const query = new URLSearchParams();

	if (title) {
		query.append('title', title);
	}

	const res = await fetch(`${API_URL}/movies/search?${query.toString()}`, {
		next: {
			revalidate: 60,
			tags: ['search-movies'],
		},
	});

	if (!res.ok) {
		throw new Error(`Ошибка при поиске фильмов: ${res.status}`);
	}

	const data = await res.json();
	return data.items || [];
};
