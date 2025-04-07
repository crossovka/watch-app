import Link from 'next/link';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
	return (
		<main>
			<h1>Регистрация</h1>
			<h2>
				Уже есть аккаунт?{' '}
				<Link
					href="/login"
					style={{ color: 'blue', textDecoration: 'underline' }}
				>
					Войти
				</Link>
			</h2>
			<RegisterForm />
		</main>
	);
}
