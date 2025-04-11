export function getAccessTokenFromCookie(): string | undefined {
	const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]*)/);
	return match?.[1];
}
