/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { Movie } from './movie.entity'

@Entity('watch_history')
export class WatchHistory {
	@PrimaryGeneratedColumn()
	id: number

	@ManyToOne(() => User, (user) => user.watchHistory)
	user: User

	@ManyToOne(() => Movie, (movie) => movie.watchHistory)
	movie: Movie

	@CreateDateColumn()
	watchedAt: Date
}
