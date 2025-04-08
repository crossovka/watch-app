'use client';

import { useEffect, useState } from 'react';

import { searchMovies } from '@/lib/api/movies/search-movies';
import { useDebounce } from '@/hooks/useDebounce';

import { SearchInput } from '@/components/elements/SearchInput';
import { MovieMinimal } from '@/@types/movie.type';

type MovieSearchProps = {
	onResults: (movies: MovieMinimal[] | null) => void;
};

export const MovieSearch = ({ onResults }: MovieSearchProps) => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, 500);

	useEffect(() => {
		// 🛠️ Не триггерим onResults вообще, если строка пустая
		if (debouncedQuery === '') {
			onResults(null); // ⬅️ Важно! Возвращаем null, чтобы вернуться к initialMovies
			return;
		}

		const fetchData = async () => {
			try {
				const movies = await searchMovies(debouncedQuery);
				onResults(movies);
			} catch (error) {
				console.error('Ошибка поиска фильмов:', error);
				onResults([]);
			}
		};

		fetchData();
	}, [debouncedQuery, onResults]);

	return (
		<div className="mb-6">
			<SearchInput value={query} onChange={setQuery} />
		</div>
	);
};
