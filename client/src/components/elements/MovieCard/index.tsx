import Image from 'next/image';
import Link from 'next/link';

import { CategoryMinimal } from '@/@types/category.types';

type MovieCardProps = {
	year: number;
	thumbnail: string;
	title: string;
	slug: string;
	categories: CategoryMinimal[];
	addedAt: string;
};

export const MovieCard: React.FC<MovieCardProps> = ({
	year,
	thumbnail,
	title,
	slug,
	categories,
}) => {
	return (
		<div className="">
			<Link href={`/movies/${slug}`} className="">
				<div className="">
					<Image
						src={thumbnail}
						alt={slug}
						width={300}
						height={300}
						className="rounded-xl object-cover"
					/>
				</div>

				<h3 className="">{title}</h3>
				<p className="">{year}</p>
			</Link>

			<div className="flex gap-2 mt-2 flex-wrap">
				{categories.map((cat) => (
					<Link
						key={cat.slug}
						href={`/category/${cat.slug}`}
						className="text-sm text-blue-600 hover:underline"
					>
						{cat.name}
					</Link>
				))}
			</div>
		</div>
	);
};
