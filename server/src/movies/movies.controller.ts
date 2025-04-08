import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common'
import { Query } from '@nestjs/common'

import { MoviesService } from './movies.service'

import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'

import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { SearchMovieDto } from './dto/search-movie.dto'
import { RequestWithUser } from 'src/@types/request-with-user'

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

	@UseGuards(JwtAuthGuard)
	@Post(':slug/view')
	async addView(@Param('slug') slug: string, @Req() req: RequestWithUser) {
		const userId = req.user.id
		console.log('👉 userId:', userId)
		const { views } = await this.moviesService.addView(slug, userId)
		return { views }
	}

	@UseGuards(JwtAuthGuard)
	@Get('history/watched')
	async getWatchHistory(
		@Req() req: RequestWithUser,
		@Query('page') page: number = 1,
		@Query('perPage') perPage: number = 10
	) {
		return this.moviesService.getWatchHistory(req.user.id, Number(page), Number(perPage))
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
