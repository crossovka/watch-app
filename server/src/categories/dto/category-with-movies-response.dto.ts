import { Movie } from 'src/movies/entities/movie.entity'
import { Category } from '../entities/category.entity'

export class CategoryWithMoviesResponseDto {
	id: number
	name: string
	slug: string
	description: string
	thumbnail: string
	movies: {
		id: number
		title: string
		slug: string
		poster: string
		rating: number
		year: number
	}[]

	constructor(category: Category & { movies: Movie[] }) {
		this.id = category.id
		this.name = category.name
		this.slug = category.slug
		this.description = category.description
		this.thumbnail = category.thumbnail
		this.movies = category.movies.map((movie) => ({
			id: movie.id,
			title: movie.title,
			slug: movie.slug,
			poster: movie.poster,
			rating: movie.rating,
			year: movie.year
		}))
	}
}
