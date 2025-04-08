'use client';

import { useState } from 'react';
import { MovieCard } from '@/components/elements/MovieCard';
import { Pagination } from '@/components/modules/Pagination';
import { MovieSearch } from '@/components/modules/MovieSearch';
import { MovieMinimal } from '@/@types/movie.types';

type MoviesListProps = {
	initialMovies: MovieMinimal[];
	page: number;
	totalPages: number;
};

export const MoviesList = ({
	initialMovies,
	page,
	totalPages,
}: MoviesListProps) => {
	const [searchResults, setSearchResults] = useState<MovieMinimal[] | null>(
		null
	);

	const isSearching = searchResults !== null;
	const moviesToRender = isSearching ? searchResults : initialMovies;

	return (
		<div>
			<h1 className="">Фильмы</h1>

			<MovieSearch onResults={setSearchResults} />

			{moviesToRender.length === 0 ? (
				<p className="">Фильмы не найдены</p>
			) : (
				<div className="">
					{moviesToRender.map((movie) => (
						<MovieCard key={movie.slug} {...movie} />
					))}
				</div>
			)}

			{!isSearching && <Pagination page={page} totalPages={totalPages} />}
		</div>
	);
};
