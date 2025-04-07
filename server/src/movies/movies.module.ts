import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Movie } from './entities/movie.entity'
import { Category } from 'src/categories/entities/category.entity'
import { User } from 'src/user/entities/user.entity'
import { MovieView } from './entities/movie-view.entity'

import { AuthModule } from 'src/auth/auth.module'
import { MoviesController } from './movies.controller'
import { MoviesService } from './movies.service'

@Module({
	imports: [TypeOrmModule.forFeature([Movie, Category, User, MovieView]), AuthModule],
	controllers: [MoviesController],
	providers: [MoviesService]
})
export class MoviesModule {}
