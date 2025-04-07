import { Movie } from 'src/movies/entities/movie.entity'

export class MovieShortDto {
	year: number
	thumbnail: string
	slug: string
	categories: { name: string; slug: string }[]

	constructor(movie: Movie) {
		this.year = movie.year
		this.thumbnail = movie.thumbnail
		this.slug = movie.slug
		this.categories =
			movie.categories?.map((cat) => ({
				name: cat.name,
				slug: cat.slug
			})) || []
	}
}
