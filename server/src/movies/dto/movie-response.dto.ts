import { Movie } from '../entities/movie.entity'

export class MovieResponseDto {
	constructor(movie: Movie) {
		Object.assign(this, movie)
	}

	slug: string
	title: string
	description: string
	year: number
	duration: number
	rating: number
	favoritesCount: number
	views: number
	categories: string[]
	thumbnail: string
	poster: string
	videoUrl: string
	createdAt: Date
	updatedAt: Date
}
