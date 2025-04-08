import Image from 'next/image';
import Link from 'next/link';

import { CategoryMinimal } from '@/@types/category.types';

type MovieCardProps = {
	year: number;
	thumbnail: string;
	slug: string;
	categories: CategoryMinimal[];
	addedAt: string;
};

export const MovieCard: React.FC<MovieCardProps> = ({
	year,
	thumbnail,
	slug,
	categories,
}) => {
	return (
		<div className="">
			<div className="">
				<Image
					src={thumbnail}
					alt={slug}
					layout="fill"
					objectFit="cover"
					className=""
				/>
			</div>

			<h3 className="">{slug}</h3>
			<p className="">{year}</p>

			<div className="">
				{categories.map((cat) => (
					<Link key={cat.slug} href={`/category/${cat.slug}`} className="">
						{cat.name}
					</Link>
				))}
			</div>
		</div>
	);
};
