import { cookies } from 'next/headers';

export default function TestPage() {
	const token = cookies().get('access_token')?.value;
	return <pre>Token: {token}</pre>;
}
