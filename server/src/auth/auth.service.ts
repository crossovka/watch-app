import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async validateUser(email: string, password: string): Promise<any> {
		const user = await this.userService.findByEmail(email)
		if (user && (await bcrypt.compare(password, user.password))) {
			const { password, ...result } = user
			return result
		}
		throw new UnauthorizedException('Неверные данные для входа')
	}

	async login(user: { email: string; password: string }) {
		const validatedUser = await this.validateUser(user.email, user.password)

		if (!validatedUser.isEmailConfirmed) {
			throw new HttpException('Email не подтверждён', HttpStatus.UNAUTHORIZED)
		}

		const payload = {
			sub: validatedUser.id,
			email: validatedUser.email
		}

		return {
			access_token: this.jwtService.sign(payload),
			...validatedUser
		}
	}
}
