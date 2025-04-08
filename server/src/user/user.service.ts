import {
	Injectable,
	HttpException,
	HttpStatus,
	ConflictException,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

import { EmailService } from 'src/email/email.service'

import { User } from './entities/user.entity'
import { Favorite } from './entities/favorite.entity'
import { Movie } from 'src/movies/entities/movie.entity'

import { RegisterUserDto } from './dto/RegisterUserDto.dto'
import { MovieShortDto } from 'src/movies/dto/movie-short.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly emailService: EmailService,

		@InjectRepository(Favorite)
		private readonly favoriteRepo: Repository<Favorite>,

		@InjectRepository(Movie)
		private readonly movieRepo: Repository<Movie>
	) {}

	async registerUser(userDto: RegisterUserDto): Promise<{ message: string; user: Partial<User> }> {
		const { name, email, password } = userDto

		const existingUser = await this.userRepository.findOne({ where: { email } })
		if (existingUser) {
			throw new HttpException('Email уже используется', HttpStatus.BAD_REQUEST)
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const emailConfirmationToken = uuidv4()

		const newUser = this.userRepository.create({
			name,
			email,
			password: hashedPassword,
			isEmailConfirmed: false,
			emailConfirmationToken
		})

		const savedUser = await this.userRepository.save(newUser)

		// Отправляем письмо
		await this.emailService.sendConfirmationEmail(email, emailConfirmationToken)

		return {
			message: 'Пользователь зарегистрирован. Подтвердите email.',
			user: {
				id: savedUser.id,
				name: savedUser.name,
				email: savedUser.email
			}
		}
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { email } })
	}

	async confirmEmail(token: string): Promise<{ message: string }> {
		const user = await this.userRepository.findOne({ where: { emailConfirmationToken: token } })

		if (!user) {
			throw new HttpException('Неверный токен', HttpStatus.BAD_REQUEST)
		}

		user.isEmailConfirmed = true
		user.emailConfirmationToken = null
		await this.userRepository.save(user)

		return { message: 'Email успешно подтверждён' }
	}

	async addToFavorites(userId: number, movieSlug: string) {
		const user = await this.userRepository.findOneBy({ id: userId })
		const movie = await this.movieRepo.findOneBy({ slug: movieSlug })

		const existing = await this.favoriteRepo.findOne({
			where: { user: { id: userId }, movie: { id: movie.id } }
		})

		if (existing) {
			throw new ConflictException('Movie already in favorites')
		}

		const favorite = this.favoriteRepo.create({ user, movie })
		await this.favoriteRepo.save(favorite)

		await this.movieRepo.increment({ id: movie.id }, 'favoritesCount', 1)

		return { success: true }
	}

	async removeFromFavorites(userId: number, movieSlug: string) {
		const movie = await this.movieRepo.findOneBy({ slug: movieSlug })
		const favorite = await this.favoriteRepo.findOne({
			where: { user: { id: userId }, movie: { id: movie.id } }
		})

		if (!favorite) {
			throw new NotFoundException('Movie not found in favorites')
		}

		await this.favoriteRepo.remove(favorite)
		await this.movieRepo.decrement({ id: movie.id }, 'favoritesCount', 1)

		return { success: true }
	}

	async getFavorites(userId: number, page: number = 1, perPage: number = 10) {
		const [favorites, total] = await this.favoriteRepo.findAndCount({
			where: { user: { id: userId } },
			relations: ['movie', 'movie.categories'], // не забудь подгрузить категории!
			order: { addedAt: 'DESC' },
			skip: (page - 1) * perPage,
			take: perPage
		})

		return {
			data: favorites.map((fav) => {
				const dto = new MovieShortDto(fav.movie)
				return {
					...dto,
					addedAt: fav.addedAt // если тебе всё ещё нужно добавленное время
				}
			}),
			total,
			page,
			perPage,
			totalPages: Math.ceil(total / perPage)
		}
	}
}
