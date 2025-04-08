import Link from 'next/link';

export default function Home() {
	return (
		<>
			<h1>Главная страница</h1>
			<div style={{ marginTop: '20px' }}>
				<Link
					href="/user/favorites"
					style={{ color: 'green', textDecoration: 'underline' }}
				>
					Перейти к избранным фильмам
				</Link>
			</div>
			<div style={{ marginTop: '20px' }}>
				<Link
					href="/test"
					style={{ color: 'green', textDecoration: 'underline' }}
				>
					test
				</Link>
			</div>
		</>
	);
}
