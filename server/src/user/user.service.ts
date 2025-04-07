import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { EmailService } from 'src/email/email.service'

import { User } from './entities/user.entity'

import { RegisterUserDto } from './dto/RegisterUserDto.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly emailService: EmailService
	) {}

	async registerUser(userDto: RegisterUserDto): Promise<{ message: string; user: Partial<User> }> {
		const { name, email, password } = userDto

		const existingUser = await this.userRepository.findOne({ where: { email } })
		if (existingUser) {
			throw new HttpException('Email уже используется', HttpStatus.BAD_REQUEST)
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const emailConfirmationToken = uuidv4()

		const newUser = this.userRepository.create({
			name,
			email,
			password: hashedPassword,
			isEmailConfirmed: false,
			emailConfirmationToken
		})

		const savedUser = await this.userRepository.save(newUser)

		// Отправляем письмо
		await this.emailService.sendConfirmationEmail(email, emailConfirmationToken)

		return {
			message: 'Пользователь зарегистрирован. Подтвердите email.',
			user: {
				id: savedUser.id,
				name: savedUser.name,
				email: savedUser.email
			}
		}
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userRepository.findOne({ where: { email } })
	}

	async confirmEmail(token: string): Promise<{ message: string }> {
		const user = await this.userRepository.findOne({ where: { emailConfirmationToken: token } })

		if (!user) {
			throw new HttpException('Неверный токен', HttpStatus.BAD_REQUEST)
		}

		user.isEmailConfirmed = true
		user.emailConfirmationToken = null
		await this.userRepository.save(user)

		return { message: 'Email успешно подтверждён' }
	}
}
