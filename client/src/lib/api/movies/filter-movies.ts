import { API_URL } from '@/config/api.config';
import { MovieMinimal } from '@/@types/movie.types';

export interface MovieFilters {
	title?: string;
	categories?: string[];
	page?: number;
	perPage?: number;
}

export const filterMovies = async (
	filters: MovieFilters
): Promise<{
	items: MovieMinimal[];
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
}> => {
	const query = new URLSearchParams();

	if (filters.title) query.append('title', filters.title);
	if (filters.categories)
		filters.categories.forEach((c) => query.append('categories', c));
	if (filters.page) query.append('page', filters.page.toString());
	if (filters.perPage) query.append('perPage', filters.perPage.toString());

	const res = await fetch(`${API_URL}/movies/search?${query.toString()}`, {
		next: {
			revalidate: 60,
			tags: ['filter-movies'],
		},
	});

	if (!res.ok) throw new Error(`Ошибка при фильтрации фильмов: ${res.status}`);

	return await res.json();
};
