// Пример переключателя
'use client';

import { useActions } from '@/hooks/useActions';
import { selectCurrentTheme } from '@/redux/slices/theme/theme.selectors';
import { useAppSelector } from '@/redux/store';

export const ThemeToggle = () => {
	const { toggleTheme } = useActions();
	const mode = useAppSelector(selectCurrentTheme);

	return (
		<button
			onClick={() => {
				console.log('Тема переключена');
				toggleTheme();
			}}
		>
			Тема: {mode}
		</button>
	);
};
