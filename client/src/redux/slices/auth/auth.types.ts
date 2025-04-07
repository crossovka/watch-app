export interface IUser {
	id: number;
	name: string;
	email: string;
	access_token: string; 
}

export interface AuthState {
	user: IUser | null;
	isLoading: boolean;
	error: string | null;
}

export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	name: string;
	email: string;
	password: string;
}
