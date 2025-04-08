/* eslint-disable indent */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
	OneToMany
} from 'typeorm'

import { Category } from 'src/categories/entities/category.entity'
import { WatchHistory } from './watch-history.entity'
import { Favorite } from 'src/user/entities/favorite.entity'

@Entity('movies')
export class Movie {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ unique: true })
	slug: string

	@Column()
	title: string

	@Column({ type: 'text' })
	description: string

	@Column()
	year: number

	@Column()
	duration: number

	@Column({ type: 'float' })
	rating: number

	@Column({ default: 0 })
	favoritesCount: number

	@Column({ default: 0 })
	views: number

	@ManyToMany(() => Category, (category) => category.movies, { cascade: true })
	@JoinTable()
	categories: Category[]

	@OneToMany(() => WatchHistory, (history) => history.movie)
	watchHistory: WatchHistory[]

	@OneToMany(() => Favorite, (favorite) => favorite.movie)
	favorites: Favorite[]

	@Column()
	thumbnail: string

	@Column()
	videoUrl: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
