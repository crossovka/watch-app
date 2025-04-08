'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
	page: number;
	totalPages: number;
};

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const goToPage = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', String(newPage));

		router.push(`?${params.toString()}`);
	};

	return (
		<div className="">
			<button
				onClick={() => goToPage(page - 1)}
				disabled={page <= 1}
				className=""
			>
				Назад
			</button>
			<span className="text-sm">
				{page} / {totalPages}
			</span>
			<button
				onClick={() => goToPage(page + 1)}
				disabled={page >= totalPages}
				className=""
			>
				Далее
			</button>
		</div>
	);
};
