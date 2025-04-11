import { CategoryMinimal } from './category.types';

export type MovieMinimal = {
	year: number;
	thumbnail: string;
	title: string;
	slug: string;
	categories: CategoryMinimal[];
	addedAt: string;
	isFavorite?: boolean
};

export type MovieFull = {
	slug: string;
	title: string;
	description: string;
	year: number;
	duration: number;
	rating: number;
	favoritesCount: number;
	views: number;
	thumbnail: string;
	videoUrl: string;
	createdAt: string;
	updatedAt: string;
	categories: CategoryMinimal[];
};
