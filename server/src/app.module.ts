import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { MoviesModule } from './movies/movies.module'
import { CategoriesModule } from './categories/categories.module'

import { User } from './user/entities/user.entity'
import { Movie } from './movies/entities/movie.entity'
import { Category } from './categories/entities/category.entity'
import { MovieView } from './movies/entities/movie-view.entity'
import { WatchHistory } from './movies/entities/watch-history.entity'
import { Favorite } from './user/entities/favorite.entity'

import { EmailService } from './email/email.service'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }), // Загружаем .env
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: parseInt(process.env.DATABASE_PORT, 10),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			entities: [User, Movie, Category, MovieView, WatchHistory, Favorite],
			synchronize: true // В проде лучше использовать миграции
		}),
		AuthModule,
		UserModule,
		MoviesModule,
		CategoriesModule
	],
	controllers: [],
	providers: [EmailService]
})
export class AppModule {}
