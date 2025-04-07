/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

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

	@Column('simple-array')
	categories: string[]

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
