'use client';

import { ThemeToggle } from '@/components/elements/ThemeToggler';
import { useAppSelector } from '@/redux/store';
import { selectUserName } from '@/redux/slices/auth/auth.selectors';

export const Header = () => {
	const userName = useAppSelector(selectUserName);

	return (
		<header
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				padding: '1rem 2rem',
				backgroundColor: '#f0f0f0',
			}}
		>
			<h1 style={{ margin: 0 }}>
				{' '}
				{userName && <span>{`Добро пожаловать, ${userName}`}</span>}{' '}
			</h1>
			<ThemeToggle />
		</header>
	);
};
