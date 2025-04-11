import { API_URL } from '@/config/api.config';
import { CategoryFull } from '@/@types/category.types';

export const getCategoryBySlug = async (
	slug: string
): Promise<CategoryFull> => {
	const res = await fetch(`${API_URL}/categories/${slug}`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error(`Ошибка при получении категории: ${res.status}`);
	}

	return res.json();
};
