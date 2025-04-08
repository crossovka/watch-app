import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
	Req,
	UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { RegisterUserDto } from './dto/RegisterUserDto.dto'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { RequestWithUser } from 'src/@types/request-with-user'

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

	@Post('favorites/:slug')
	@UseGuards(JwtAuthGuard)
	async addFavorite(@Param('slug') slug: string, @Req() req: RequestWithUser) {
		return this.userService.addToFavorites(req.user.id, slug)
	}

	@Delete('favorites/:slug')
	@UseGuards(JwtAuthGuard)
	async removeFavorite(@Param('slug') slug: string, @Req() req: RequestWithUser) {
		return this.userService.removeFromFavorites(req.user.id, slug)
	}

	@Get('favorites')
	@UseGuards(JwtAuthGuard)
	async getFavorites(
		@Req() req: RequestWithUser,
		@Query('page') page: number = 1,
		@Query('perPage') perPage: number = 10
	) {
		return this.userService.getFavorites(req.user.id, Number(page), Number(perPage))
	}
}
