/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from './user.entity'
import { Movie } from 'src/movies/entities/movie.entity'

@Entity('favorites')
export class Favorite {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User, (user) => user.favorites)
	user: User

	@ManyToOne(() => Movie, (movie) => movie.favorites)
	movie: Movie

	@CreateDateColumn()
	addedAt: Date
}
