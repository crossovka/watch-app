import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@HttpCode(200)
	async login(
		@Body() loginDto: { email: string; password: string },
		@Res({ passthrough: true }) res: Response
	) {
		const { access_token, ...user } = await this.authService.login(loginDto)

		res.cookie('access_token', access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: '/'
		})

		// верни JSON вручную
		return { user }
	}
}
