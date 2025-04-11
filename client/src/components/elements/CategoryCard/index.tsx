'use client';

import Image from 'next/image';
import Link from 'next/link';

import { CategoryPreview } from '@/@types/category.types';

type Props = {
	category: CategoryPreview;
};

export const CategoryCard = ({ category }: Props) => {
	return (
		<Link href={`/categories/${category.slug}`}>
			<div>
				<Image
					src={category.thumbnail}
					alt={category.name}
					width={300}
					height={200}
				/>
				<h3>{category.name}</h3>
			</div>
		</Link>
	);
};
