'use client';

import { useEffect, useState } from 'react';

import { filterMovies } from '@/lib/api/movies/filter-movies';
import { getCategoryNames } from '@/lib/api/categories/get-categories-names';

import { useDebounce } from '@/hooks/useDebounce';

import { SearchInput } from '@/components/elements/SearchInput';

import { MovieMinimal } from '@/@types/movie.types';
import { CategoryName } from '@/@types/category.types';

type MovieSearchProps = {
	onResults: (movies: MovieMinimal[] | null) => void;
};

export const MovieSearch = ({ onResults }: MovieSearchProps) => {
	const [query, setQuery] = useState('');
	const [categories, setCategories] = useState<CategoryName[]>([]);
	const [selectedCategorySlugs, setSelectedCategorySlugs] = useState<string[]>(
		[]
	);
	const debouncedQuery = useDebounce(query, 500);

	// Загрузка категорий при монтировании
	useEffect(() => {
		const loadCategories = async () => {
			try {
				const data = await getCategoryNames();
				setCategories(data);
			} catch (error) {
				console.error('Ошибка загрузки категорий:', error);
			}
		};
		loadCategories();
	}, []);

	// Обработка фильтрации
	useEffect(() => {
		if (debouncedQuery === '' && selectedCategorySlugs.length === 0) {
			onResults(null);
			return;
		}

		const fetchData = async () => {
			try {
				const result = await filterMovies({
					title: debouncedQuery,
					categories: selectedCategorySlugs,
				});
				onResults(result.items);
			} catch (error) {
				console.error('Ошибка фильтрации фильмов:', error);
				onResults([]);
			}
		};

		fetchData();
	}, [debouncedQuery, selectedCategorySlugs, onResults]);

	const handleCategoryChange = (categorySlug: string) => {
		setSelectedCategorySlugs((prev) =>
			prev.includes(categorySlug)
				? prev.filter((slug) => slug !== categorySlug)
				: [...prev, categorySlug]
		);
	};

	return (
		<div className="space-y-4">
			<SearchInput
				value={query}
				onChange={setQuery}
				placeholder="Поиск по названию фильма"
			/>

			<div className="space-y-2">
				<h4 className="text-sm font-medium text-gray-700">
					Фильтр по категориям:
				</h4>
				<div className="flex flex-wrap gap-2">
					{categories.map((category) => (
						<label
							key={category.slug}
							className="inline-flex items-center space-x-2 cursor-pointer"
						>
							<input
								type="checkbox"
								checked={selectedCategorySlugs.includes(category.slug)}
								onChange={() => handleCategoryChange(category.slug)}
								className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
							/>
							<span className="text-sm text-gray-800">{category.name}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
};
