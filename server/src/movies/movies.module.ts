import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Movie } from './entities/movie.entity'
import { Category } from 'src/categories/entities/category.entity'

import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

@Module({
	imports: [TypeOrmModule.forFeature([Movie, Category])],
	controllers: [MoviesController],
	providers: [MoviesService]
})
export class MoviesModule {}
