export type CategoryMinimal = {
	name: string;
	slug: string;
};

export type CategoryPreview = {
	id: number;
	name: string;
	slug: string;
	thumbnail: string;
};

export type CategoryFull = {
	id: number;
	name: string;
	slug: string;
	description: string;
	thumbnail: string;
};

export interface CategoryName {
	name: string;
	slug: string;
}
