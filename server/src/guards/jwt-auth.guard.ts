import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RequestWithUser } from 'src/@types/request-with-user'

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<RequestWithUser>()
		const token = request.headers.authorization?.split(' ')[1]

		if (!token) {
			throw new UnauthorizedException('Токен отсутствует')
		}

		try {
			const payload = this.jwtService.verify(token)

			request.user = {
				id: payload.sub,
				email: payload.email
			}

			return true
		} catch (err) {
			console.log('JWT error:', err)
			throw new UnauthorizedException('Неверный токен')
		}
	}
}
