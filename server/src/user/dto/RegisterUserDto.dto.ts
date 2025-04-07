/* eslint-disable indent */
import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class RegisterUserDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsEmail({}, { message: 'Некорректный email' })
	@IsNotEmpty()
	email: string

	@IsString()
	@IsNotEmpty()
	password: string
}
