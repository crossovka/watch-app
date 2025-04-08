'use client';

import { ChangeEvent } from 'react';

type SearchInputProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
};

export const SearchInput = ({
	value,
	onChange,
	placeholder,
}: SearchInputProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<input
			type="text"
			value={value}
			onChange={handleChange}
			placeholder={placeholder || 'Поиск фильмов...'}
			className="w-full px-4 py-2 border rounded-md shadow-sm"
		/>
	);
};
