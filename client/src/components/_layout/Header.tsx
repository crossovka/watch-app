'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ThemeToggle } from '@/components/elements/ThemeToggler';
import { useAppSelector } from '@/redux/store';
import { selectUserName } from '@/redux/slices/auth/auth.selectors';

export const Header = () => {
	const userName = useAppSelector(selectUserName);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

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
			<div>{userName && <span>{`Добро пожаловать, ${userName}`}</span>}</div>
			<nav>
				<ul
					style={{
						display: 'flex',
						listStyle: 'none',
						gap: '1rem',
						margin: 0,
						padding: 0,
					}}
				>
					<li>
						<Link href="/categories">Категории</Link>
					</li>
					<li>
						<Link href="/movies">Фильмы</Link>
					</li>
					<li>
						<Link href="/user/favorites">Избранное</Link>
					</li>
				</ul>
			</nav>
			<ThemeToggle />
		</header>
	);
};
