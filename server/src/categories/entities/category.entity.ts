/* eslint-disable indent */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany
} from 'typeorm'

import { Movie } from 'src/movies/entities/movie.entity'

@Entity('categories')
export class Category {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ unique: true })
	slug: string

	@Column({ nullable: true })
	description?: string

	@ManyToMany(() => Movie, (movie) => movie.categories)
	movies: Movie[]

	@Column()
	thumbnail: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
