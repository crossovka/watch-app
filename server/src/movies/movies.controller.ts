import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { MoviesService } from './movies.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	create(@Body() dto: CreateMovieDto) {
		return this.moviesService.create(dto)
	}

	@Get(':slug')
	find(@Param('slug') slug: string) {
		return this.moviesService.findBySlug(slug)
	}

	@Put(':slug')
	update(@Param('slug') slug: string, @Body() dto: UpdateMovieDto) {
		return this.moviesService.update(slug, dto)
	}

	@Delete(':slug')
	delete(@Param('slug') slug: string) {
		return this.moviesService.delete(slug)
	}
}
