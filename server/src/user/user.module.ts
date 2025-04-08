import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { Favorite } from './entities/favorite.entity'
import { Movie } from 'src/movies/entities/movie.entity'

import { UserController } from './user.controller'

import { EmailModule } from 'src/email/email.module'
import { AuthModule } from 'src/auth/auth.module'

import { UserService } from './user.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Favorite, Movie]),
		EmailModule,
		forwardRef(() => AuthModule)
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
