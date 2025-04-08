/* eslint-disable indent */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

import { WatchHistory } from 'src/movies/entities/watch-history.entity'
import { Favorite } from './favorite.entity'

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

	@OneToMany(() => WatchHistory, (history) => history.user)
	watchHistory: WatchHistory[]

	@OneToMany(() => Favorite, (favorite) => favorite.user)
	favorites: Favorite[]
}
