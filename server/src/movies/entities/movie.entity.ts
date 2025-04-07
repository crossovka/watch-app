/* eslint-disable indent */
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne
} from 'typeorm'
import { Category } from 'src/categories/entities/category.entity'

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

	@ManyToOne(() => Category, (category) => category.movies)
	category: Category

	@Column()
	thumbnail: string

	@Column()
	poster: string

	@Column()
	videoUrl: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
