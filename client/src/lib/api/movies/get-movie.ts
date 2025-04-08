import { API_URL } from '@/config/api.config';
import { MovieFull } from '@/@types/movie.types';

export const getMovieBySlug = async (slug: string): Promise<MovieFull> => {
	const res = await fetch(`${API_URL}/movies/${slug}`, {
		next: {
			revalidate: 60,
			tags: ['movie'],
		},
	});

	if (!res.ok) {
		throw new Error(`Ошибка при получении фильма: ${res.status}`);
	}

	const data = await res.json();
	return data;
};
