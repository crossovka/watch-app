import Link from 'next/link';
import LoginForm from './LoginForm';

export default function LoginPage() {
	return (
		<main>
			<h1>Вход</h1>
			<h2>
				Нет аккаунта?{' '}
				<Link
					href="/register"
					style={{ color: 'blue', textDecoration: 'underline' }}
				>
					Зарегистрироваться
				</Link>
			</h2>
			<LoginForm />
		</main>
	);
}
