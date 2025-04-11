'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { addToFavoritesClient } from '@/lib/api/user/add-to-favorites.client';
import { removeFromFavoritesClient } from '@/lib/api/user/remove-from-favorites.client';

import { CategoryMinimal } from '@/@types/category.types';

type MovieCardProps = {
	year: number;
	thumbnail: string;
	title: string;
	slug: string;
	categories: CategoryMinimal[];
	addedAt: string;
	isFavorite?: boolean;
};

export const MovieCard: React.FC<MovieCardProps> = ({
	year,
	thumbnail,
	title,
	slug,
	categories,
	isFavorite: initialFavorite = false,
}) => {
	const [isFavorite, setIsFavorite] = useState(initialFavorite);
	const [loading, setLoading] = useState(false);

	const handleToggleFavorite = async () => {
		try {
			setLoading(true);

			if (isFavorite) {
				await removeFromFavoritesClient(slug);
				setIsFavorite(false);
				toast.success('Фильм удалён из избранного');
			} else {
				await addToFavoritesClient(slug);
				setIsFavorite(true);
				toast.success('Фильм добавлен в избранное');
			}
		} catch (err) {
			const message =
				err instanceof Error ? err.message : 'Ошибка при изменении избранного';

			toast.error(message);
			console.error('Ошибка при работе с избранным:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Link href={`/movies/${slug}`}>
				<Image src={thumbnail} alt={slug} width={300} height={300} />
				<h3>{title}</h3>
				<p>{year}</p>
			</Link>

			<div>
				{categories.map((cat) => (
					<Link key={cat.slug} href={`/category/${cat.slug}`}>
						{cat.name}
					</Link>
				))}
			</div>

			<button
				onClick={handleToggleFavorite}
				className={`${isFavorite ? 'active' : ''}`}
				disabled={loading}
			>
				{loading
					? 'Обновление...'
					: isFavorite
					? 'Удалить из избранного'
					: 'Добавить в избранное'}
			</button>
		</div>
	);
};
