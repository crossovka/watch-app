/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'

import { Category } from 'src/categories/entities/category.entity'
import { Task } from 'src/tasks/entities/task.entity'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ unique: true }) // Email теперь ключ для входа
	email: string

	@Column()
	password: string

	@ManyToMany(() => Task, (task) => task.users)
	@JoinTable()
	tasks: Task[]

	@OneToMany(() => Category, (category) => category.user)
	categories: Category[]
}
