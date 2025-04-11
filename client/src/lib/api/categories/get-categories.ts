import { API_URL } from '@/config/api.config';
import { CategoryPreview } from '@/@types/category.types';

export const getCategories = async (): Promise<CategoryPreview[]> => {
	const res = await fetch(`${API_URL}/categories`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error('Ошибка при получении категорий');
	}

	return res.json();
};
