'use client';

import { useState } from 'react';
import { MovieCard } from '@/components/elements/MovieCard';
import { MovieMinimal } from '@/@types/movie.types';

type Props = {
	initialMovies: MovieMinimal[];
};

export const FavoriteList = ({ initialMovies }: Props) => {
	const [movies, setMovies] = useState(initialMovies);

	const handleRemove = (slug: string) => {
		setMovies((prev) => prev.filter((m) => m.slug !== slug));
	};

	if (movies.length === 0) {
		return <p>Нет избранных фильмов</p>;
	}

	return (
		<div>
			{movies.map((movie) => (
				<MovieCard
					key={movie.slug}
					{...movie}
					onRemoveFromFavorites={handleRemove}
				/>
			))}
		</div>
	);
};
