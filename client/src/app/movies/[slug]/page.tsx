import { notFound } from 'next/navigation';
import Image from 'next/image';

import { getMovieBySlug } from '@/lib/api/movies/get-movie';

type MoviePageProps = {
	params: { slug: string };
};

export async function generateMetadata({ params }: MoviePageProps) {
	try {
		const movie = await getMovieBySlug(params.slug);
		return {
			title: `${movie.title} – Страница фильма`,
			description: movie.description,
			openGraph: {
				title: movie.title,
				description: movie.description,
				image: movie.thumbnail,
				url: `/${params.slug}`,
			},
			twitter: {
				card: 'summary_large_image',
				title: movie.title,
				description: movie.description,
				image: movie.thumbnail,
			},
		};
	} catch (error) {
		console.error('Ошибка при получении метаданных фильма:', error);
		return {
			title: 'Фильм не найден',
			description: 'Данный фильм не существует.',
		};
	}
}

export default async function MoviePage({ params }: MoviePageProps) {
	try {
		// Получаем фильм по slug
		const movie = await getMovieBySlug(params.slug);

		return (
			<main>
				<h1 className="">{movie.title}</h1>
				<p className="">{movie.description}</p>
				<p className="">
					Год: {movie.year} · Длительность: {movie.duration} мин · Рейтинг:{' '}
					{movie.rating}
				</p>

				{/* Используем Next Image для отображения картинки */}
				<Image
					src={movie.thumbnail}
					alt={movie.title}
					width={300}
					height={300}
					className="rounded-xl object-cover"
				/>

				{/* Добавляем видео */}
				{movie.videoUrl && (
					<video controls src={movie.videoUrl} className="my-4 w-full" />
				)}
			</main>
		);
	} catch (error) {
		console.error(error);
		notFound();  // Страница не найдена
	}
}
