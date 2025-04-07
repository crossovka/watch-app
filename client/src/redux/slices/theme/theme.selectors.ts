import { RootState } from '@/redux/store';

export const selectCurrentTheme = (state: RootState) => state.theme.currentTheme;
