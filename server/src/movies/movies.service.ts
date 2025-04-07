import { addHours, isBefore } from 'date-fns'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Movie } from './entities/movie.entity'
import { Category } from 'src/categories/entities/category.entity'
import { MovieView } from './entities/movie-view.entity'
import { User } from 'src/user/entities/user.entity'

import { throwIfDuplicate, throwIfNotFound } from 'src/utils/http-exceptions'
import { generateSlug } from 'src/utils/slugify'
import { getVideoDuration } from 'src/utils/get-video-duration'

import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { MovieResponseDto } from './dto/movie-response.dto'
import { MovieShortDto } from './dto/movie-short.dto'

@Injectable()
export class MoviesService {
	constructor(
		@InjectRepository(Movie)
		private readonly movieRepo: Repository<Movie>,

		@InjectRepository(Category)
		private readonly categoryRepo: Repository<Category>,

		@InjectRepository(User)
		private readonly userRepo: Repository<User>,

		@InjectRepository(MovieView)
		private readonly viewRepo: Repository<MovieView>
	) {}

	async create(dto: CreateMovieDto): Promise<MovieResponseDto> {
		const slug = generateSlug(dto.title)

		const existing = await this.movieRepo.findOne({ where: { slug } })
		throwIfDuplicate(existing, 'Movie already exists')

		const duration = await getVideoDuration(dto.videoUrl)

		// Загружаем категории по переданным слагам
		const categories = await this.categoryRepo.find({
			where: dto.categories.map((slug) => ({ slug }))
		})

		if (categories.length !== dto.categories.length) {
			const missing = dto.categories.filter((slug) => !categories.some((cat) => cat.slug === slug))
			throw new Error(`Категории не найдены: ${missing.join(', ')}`)
		}

		const movie = this.movieRepo.create({
			slug,
			duration,
			title: dto.title,
			description: dto.description,
			year: dto.year,
			rating: dto.rating,
			thumbnail: dto.thumbnail,
			videoUrl: dto.videoUrl,
			categories
		})

		const saved = await this.movieRepo.save(movie)
		return new MovieResponseDto(saved)
	}

	async findAllShort(
		page = 1,
		perPage = 10
	): Promise<{
		items: MovieShortDto[]
		total: number
		page: number
		perPage: number
	}> {
		const [movies, total] = await this.movieRepo.findAndCount({
			skip: (page - 1) * perPage,
			take: perPage,
			order: { createdAt: 'DESC' } // сортируем от новых к старым
		})

		return {
			items: movies.map((movie) => new MovieShortDto(movie)),
			total,
			page,
			perPage
		}
	}

	async search(query: {
		title?: string
		year?: number
		minRating?: number
		maxRating?: number
		categories?: string[]
		page?: number
		perPage?: number
	}): Promise<{
		items: MovieShortDto[]
		total: number
		page: number
		perPage: number
	}> {
		const { title, year, minRating, maxRating, categories, page = 1, perPage = 10 } = query

		const qb = this.movieRepo
			.createQueryBuilder('movie')
			.leftJoinAndSelect('movie.categories', 'category')
			.skip((page - 1) * perPage)
			.take(perPage)
			.orderBy('movie.createdAt', 'DESC')

		if (title) {
			qb.andWhere('LOWER(movie.title) LIKE LOWER(:title)', { title: `%${title}%` })
		}

		if (year) {
			qb.andWhere('movie.year = :year', { year })
		}

		if (minRating) {
			qb.andWhere('movie.rating >= :minRating', { minRating })
		}

		if (maxRating) {
			qb.andWhere('movie.rating <= :maxRating', { maxRating })
		}

		if (categories && categories.length > 0) {
			qb.andWhere('category.slug IN (:...categories)', { categories })
		}

		const [movies, total] = await qb.getManyAndCount()

		return {
			items: movies.map((movie) => new MovieShortDto(movie)),
			total,
			page,
			perPage
		}
	}

	async findBySlug(slug: string): Promise<MovieResponseDto> {
		const movie = await this.movieRepo.findOne({
			where: { slug },
			relations: ['categories'] // вот это ключевое
		})
		throwIfNotFound(movie, 'Movie not found')
		return new MovieResponseDto(movie)
	}

	async addView(slug: string, userId: number): Promise<{ views: number }> {
		console.log('🔍 addView called with slug:', slug, 'userId:', userId)

		const movie = await this.movieRepo.findOne({ where: { slug } })
		throwIfNotFound(movie, 'Movie not found')

		const user = await this.userRepo.findOneBy({ id: userId })
		throwIfNotFound(user, 'User not found')

		// Получаем последний просмотр этого фильма этим пользователем
		const existingView = await this.viewRepo.findOne({
			where: {
				movie: { id: movie.id },
				user: { id: user.id }
			},
			order: { createdAt: 'DESC' },
			relations: ['movie', 'user']
		})

		console.log('🔍 existingView:', existingView)

		const now = new Date()

		if (!existingView) {
			// Первый просмотр — создаём запись и увеличиваем views
			const newView = this.viewRepo.create({ movie, user })
			await this.viewRepo.save(newView)

			await this.movieRepo
				.createQueryBuilder()
				.update(Movie)
				.set({ views: () => 'views + 1' })
				.where('id = :id', { id: movie.id })
				.execute()

			console.log('✅ First view — counter incremented')
		} else {
			const nextAllowedViewTime = addHours(existingView.createdAt, 6)
			// const nextAllowedViewTime = addSeconds(existingView.createdAt, 2)

			if (isBefore(nextAllowedViewTime, now)) {
				// Прошло больше 2 секунд — разрешаем новый просмотр
				const newView = this.viewRepo.create({ movie, user })
				await this.viewRepo.save(newView)

				await this.movieRepo
					.createQueryBuilder()
					.update(Movie)
					.set({ views: () => 'views + 1' })
					.where('id = :id', { id: movie.id })
					.execute()

				console.log('✅ Repeat view allowed after 2s — counter incremented')
			} else {
				const waitMs = nextAllowedViewTime.getTime() - now.getTime()
				console.log(`⏳ Wait ${waitMs}ms before next view counts`)
			}
		}

		const updatedMovie = await this.movieRepo.findOneBy({ id: movie.id })
		return { views: updatedMovie?.views || 0 }
	}

	async update(slug: string, dto: UpdateMovieDto): Promise<MovieResponseDto> {
		const movie = await this.movieRepo.findOne({
			where: { slug },
			relations: ['categories']
		})
		throwIfNotFound(movie, 'Movie not found')

		if (dto.title && dto.title !== movie.title) {
			movie.slug = generateSlug(dto.title)
		}

		// если переданы категории — перезаписываем
		if (dto.categories && dto.categories.length > 0) {
			const categories = await this.categoryRepo.find({
				where: dto.categories.map((slug) => ({ slug }))
			})

			if (categories.length !== dto.categories.length) {
				const missing = dto.categories.filter(
					(slug) => !categories.some((cat) => cat.slug === slug)
				)
				throw new Error(`Категории не найдены: ${missing.join(', ')}`)
			}

			movie.categories = categories
		}

		Object.assign(movie, dto)
		const updated = await this.movieRepo.save(movie)
		return new MovieResponseDto(updated)
	}

	async delete(slug: string): Promise<void> {
		const movie = await this.movieRepo.findOne({ where: { slug } })
		throwIfNotFound(movie, 'Movie not found')
		await this.movieRepo.remove(movie)
	}
}
