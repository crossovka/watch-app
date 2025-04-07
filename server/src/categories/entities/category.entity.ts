/* eslint-disable indent */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn
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

	@OneToMany(() => Movie, (movie) => movie.category)
	movies: Movie[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
