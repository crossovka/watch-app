import { Movie } from '../entities/movie.entity'

export class MovieResponseDto {
	slug: string
	title: string
	description: string
	year: number
	duration: number
	rating: number
	favoritesCount: number
	views: number
	categories: { name: string; slug: string }[]
	thumbnail: string
	videoUrl: string
	createdAt: Date
	updatedAt: Date

	constructor(movie: Movie) {
		this.slug = movie.slug
		this.title = movie.title
		this.description = movie.description
		this.year = movie.year
		this.duration = movie.duration
		this.rating = movie.rating
		this.favoritesCount = movie.favoritesCount
		this.views = movie.views
		this.thumbnail = movie.thumbnail
		this.videoUrl = movie.videoUrl
		this.createdAt = movie.createdAt
		this.updatedAt = movie.updatedAt
		this.categories =
			movie.categories?.map((cat) => ({
				name: cat.name,
				slug: cat.slug
			})) || []
	}
}
