import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Movie } from './entities/movie.entity'

import { throwIfDuplicate, throwIfNotFound } from 'src/utils/http-exceptions'
import { generateSlug } from 'src/utils/slugify'

import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { MovieResponseDto } from './dto/movie-response.dto'


@Injectable()
export class MoviesService {
	constructor(
		@InjectRepository(Movie)
		private readonly movieRepo: Repository<Movie>
	) {}

	async create(dto: CreateMovieDto): Promise<MovieResponseDto> {
		const slug = generateSlug(dto.title)
		const existing = await this.movieRepo.findOne({ where: { slug } })
		throwIfDuplicate(existing, 'Movie already exists')

		const movie = this.movieRepo.create({ ...dto, slug })
		const saved = await this.movieRepo.save(movie)
		return new MovieResponseDto(saved)
	}

	async findBySlug(slug: string): Promise<MovieResponseDto> {
		const movie = await this.movieRepo.findOne({ where: { slug } })
		throwIfNotFound(movie, 'Movie not found')
		return new MovieResponseDto(movie)
	}

	async update(slug: string, dto: UpdateMovieDto): Promise<MovieResponseDto> {
		const movie = await this.movieRepo.findOne({ where: { slug } })
		throwIfNotFound(movie, 'Movie not found')

		if (dto.title && dto.title !== movie.title) {
			movie.slug = generateSlug(dto.title)
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
