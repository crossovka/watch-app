// Добавляем директиву "use client" для клиентской части
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { MovieFilters } from '@/@types/movieFilters.type';
import { MovieMinimal } from '@/@types/movie.types';
import { searchMovies } from '@/lib/api/movies/filter-movies.ts';

const schema = yup.object().shape({
	title: yup.string().optional(),
	year: yup.number().optional(),
	minRating: yup.number().optional(),
	maxRating: yup.number().optional(),
	categories: yup.array().of(yup.string()).optional(),
});

export type MovieFiltersSchema = yup.InferType<typeof schema>;

type Props = {
	onResults?: (movies: MovieMinimal[] | null) => void;
};

export const MovieFiltersForm = ({ onResults }: Props) => {
	const [filteredMovies, setFilteredMovies] = useState<MovieMinimal[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<MovieFiltersSchema>({
		resolver: yupResolver(schema),
		defaultValues: {
			title: '',
			year: undefined,
			minRating: undefined,
			maxRating: undefined,
			categories: [],
		},
	});

	const onSubmit = useCallback(
		async (values: MovieFilters) => {
			try {
				const movies = await searchMovies(values);
				setFilteredMovies(movies);
				if (onResults) onResults(movies); // Передаем результат обратно в родительский компонент
			} catch (e) {
				console.error('Ошибка при фильтрации:', e);
				if (onResults) onResults([]);
			}
		},
		[onResults]
	);

	useEffect(() => {
		const sub = watch((val) => {
			handleSubmit(onSubmit)();
		});
		return () => sub.unsubscribe();
	}, [watch, handleSubmit, onSubmit]);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="">
			<div>
				<label htmlFor="title">Название:</label>
				<input {...register('title')} id="title" placeholder="Название" />
				{errors.title && <p className="">{errors.title.message}</p>}
			</div>

			<div>
				<label htmlFor="year">Год:</label>
				<input
					type="number"
					{...register('year')}
					id="year"
					placeholder="Год"
				/>
				{errors.year && <p className="">{errors.year.message}</p>}
			</div>

			<div>
				<label htmlFor="minRating">Мин. рейтинг:</label>
				<input
					type="number"
					{...register('minRating')}
					id="minRating"
					placeholder="Мин. рейтинг"
				/>
				{errors.minRating && <p className="">{errors.minRating.message}</p>}
			</div>

			<div>
				<label htmlFor="maxRating">Макс. рейтинг:</label>
				<input
					type="number"
					{...register('maxRating')}
					id="maxRating"
					placeholder="Макс. рейтинг"
				/>
				{errors.maxRating && <p className="">{errors.maxRating.message}</p>}
			</div>

			<div>
				<label htmlFor="categories">Категории:</label>
				<select {...register('categories')} id="categories" multiple>
					<option value="action">Action</option>
					<option value="comedy">Comedy</option>
					{/* Здесь можно добавить другие категории */}
				</select>
				{errors.categories && <p className="">{errors.categories.message}</p>}
			</div>

			<button type="submit">Применить фильтры</button>
		</form>
	);
};
