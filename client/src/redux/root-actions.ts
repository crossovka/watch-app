import { themeActions } from './slices/theme/theme.slice';
import { authActions } from './slices/auth/auth.slice';

export const rootActions = {
	...themeActions,
	...authActions,
};
