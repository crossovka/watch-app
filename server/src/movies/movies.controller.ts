import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { Query } from '@nestjs/common'

import { MoviesService } from './movies.service'

import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { SearchMovieDto } from './dto/search-movie.dto'

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	create(@Body() dto: CreateMovieDto) {
		return this.moviesService.create(dto)
	}

	@Get()
	findAllShort(@Query('page') page: number = 1, @Query('perPage') perPage: number = 10) {
		return this.moviesService.findAllShort(Number(page), Number(perPage))
	}

	@Get('search')
	search(@Query() query: SearchMovieDto) {
		return this.moviesService.search({
			title: query.title,
			year: query.year ? Number(query.year) : undefined,
			minRating: query.minRating ? Number(query.minRating) : undefined,
			maxRating: query.maxRating ? Number(query.maxRating) : undefined,
			categories: query.categories ? query.categories.split(',') : undefined,
			page: query.page ? Number(query.page) : 1,
			perPage: query.perPage ? Number(query.perPage) : 10
		})
	}

	@Get(':slug')
	find(@Param('slug') slug: string) {
		return this.moviesService.findBySlug(slug)
	}

	@Patch(':slug')
	update(@Param('slug') slug: string, @Body() dto: UpdateMovieDto) {
		return this.moviesService.update(slug, dto)
	}

	@Delete(':slug')
	delete(@Param('slug') slug: string) {
		return this.moviesService.delete(slug)
	}
}
