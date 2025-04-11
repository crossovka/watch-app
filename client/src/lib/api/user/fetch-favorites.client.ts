import { fetchFavoritesServer } from './fetch-favorites.server';

export const fetchFavoritesClient = async ({
	page,
	perPage,
}: {
	page: number;
	perPage: number;
}) => {
	return await fetchFavoritesServer({ page, perPage });
};
