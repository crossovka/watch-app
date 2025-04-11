import { removeFromFavoritesServerAction } from './remove-from-favorites.server';

export const removeFromFavoritesClient = async (slug: string) => {
	return await removeFromFavoritesServerAction(slug);
};
