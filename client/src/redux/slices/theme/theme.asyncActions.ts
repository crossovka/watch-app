import { TypeRootState } from '@/redux/store';

export const selectTheme = (state: TypeRootState) => state.theme.mode;
