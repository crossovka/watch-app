import { getBaseUrl } from '@/lib/utils/get-base-url';
import { getCategoryBySlug } from '@/lib/api/categories/get-category-by-slug';

type CategoryPageProps = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params }: CategoryPageProps) {
	const baseUrl = await getBaseUrl(`/category/${params.slug}`);

	return {
		title: `Категория: ${params.slug}`,
		description: `Фильмы в категории ${params.slug}`,
		alternates: {
			canonical: baseUrl,
		},
	};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	let category;

	try {
		category = await getCategoryBySlug(params.slug);
	} catch (error) {
		console.error('Ошибка при загрузке категории:', error);
		return <p>Ошибка при загрузке категории</p>;
	}

	return (
		<main>
			<h1>{category.name}</h1>
			<p>{category.description}</p>

			{/* Здесь можно будет отрисовать фильмы, если надо на бэке закоментированный код в сервисе есть и dto */}
		</main>
	);
}
