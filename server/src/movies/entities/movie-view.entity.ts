/* eslint-disable indent */
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from 'src/user/entities/user.entity'
import { Movie } from './movie.entity'

@Entity('movie_views')
export class MovieView {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User)
	user: User

	@ManyToOne(() => Movie)
	movie: Movie

	@CreateDateColumn()
	createdAt: Date
}
