import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

import { User } from './user/entities/user.entity'
import { EmailService } from './email/email.service';

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
			entities: [User],
			synchronize: true // В проде лучше использовать миграции
		}),
		AuthModule,
		UserModule
	],
	controllers: [],
	providers: [EmailService]
})
export class AppModule {}
