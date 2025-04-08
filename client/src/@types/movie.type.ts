import { CategoryMinimal } from "./category.types";

export type MovieMinimal = {
	year: number;
	thumbnail: string;
	slug: string;
	categories: CategoryMinimal[];
	addedAt: string;
};