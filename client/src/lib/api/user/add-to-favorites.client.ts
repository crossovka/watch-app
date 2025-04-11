import { addToFavoritesServerAction } from './add-to-favorites.server';

export const addToFavoritesClient = async (slug: string) => {
	return await addToFavoritesServerAction(slug);
};
