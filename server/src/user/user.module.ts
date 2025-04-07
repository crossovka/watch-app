import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './entities/user.entity'

import { UserController } from './user.controller'

import { EmailModule } from 'src/email/email.module'

import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User]), EmailModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
