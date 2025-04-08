import { headers } from 'next/headers';

export async function getBaseUrl(pathname: string): Promise<string> {
	const headersList = await headers();
	const host = headersList.get('host');
	const protocol = host?.startsWith('localhost') ? 'http' : 'https';

	return `${protocol}://${host}${pathname}`;
}
