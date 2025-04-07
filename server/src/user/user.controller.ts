import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/RegisterUserDto.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() userDto: RegisterUserDto) {
		return this.userService.registerUser(userDto)
	}

	@Get('confirm')
	async confirmEmail(@Query('token') token: string) {
		return this.userService.confirmEmail(token)
	}
}
