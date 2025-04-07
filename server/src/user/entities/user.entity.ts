/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column({ unique: true }) // Email теперь ключ для входа
	email: string

	@Column({ default: false })
	isEmailConfirmed: boolean

	@Column({ nullable: true })
	emailConfirmationToken: string

	@Column()
	password: string
}
