import { getBaseUrl } from '@/lib/utils/get-base-url';
import { getCategories } from '@/lib/api/categories/get-categories';

import { CategoryCard } from '@/components/elements/CategoryCard';

import { CategoryPreview } from '@/@types/category.types';

export const dynamic = 'force-dynamic'; // если нужно всегда SSR (иначе можно убрать)

export async function generateMetadata() {
	const baseUrl = await getBaseUrl('/categories');

	return {
		title: 'Категории фильмов',
		description: 'Список всех категорий фильмов',
		alternates: {
			canonical: baseUrl,
		},
	};
}

export default async function CategoriesPage() {
	let categories: CategoryPreview[];

	try {
		categories = await getCategories();
	} catch (error) {
		console.error('Ошибка при получении категорий:', error);
		return <p>Ошибка при загрузке категорий</p>;
	}

	return (
		<main>
			<h1>Категории</h1>

			{categories.length === 0 ? (
				<p>Категории не найдены</p>
			) : (
				<div>
					{categories.map((category) => (
						<CategoryCard key={category.slug} category={category} />
					))}
				</div>
			)}
		</main>
	);
}
