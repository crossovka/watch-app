import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { User } from '../user/entities/user.entity'

import { AuthController } from './auth.controller'

import { AuthService } from './auth.service'
import { UserModule } from 'src/user/user.module'

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		PassportModule,
		UserModule,
		JwtModule.register({
			secret: 'MY_SECRET_KEY',
			signOptions: { expiresIn: '1h' }
		})
	],
	providers: [AuthService],
	controllers: [AuthController],
	exports: [AuthService, JwtModule]
})
export class AuthModule {}
