import { RootState } from '@/redux/store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectToken = (state: RootState): string | null => state.auth.user?.access_token || null;
export const selectUserEmail = (state: RootState) => state.auth.user?.email;
export const selectUserName = (state: RootState) => state.auth.user?.name;