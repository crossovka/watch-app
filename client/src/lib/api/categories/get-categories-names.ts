import { API_URL } from '@/config/api.config';
import { CategoryName } from '@/@types/category.types';

export const getCategoryNames = async (): Promise<CategoryName[]> => {
	const res = await fetch(`${API_URL}/categories/names`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error('Ошибка при получении имен категорий');
	}

	const data = await res.json();
	return data;
};
