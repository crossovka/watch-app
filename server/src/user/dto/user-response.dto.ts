import { Exclude, Expose } from 'class-transformer'
import { IsInt, IsString } from 'class-validator'

export class UserResponseDto {
	@IsInt()
	@Expose()
	id: number

	@IsString()
	@Expose()
	name: string

	@Exclude()
	@IsString()
	password: string

	@Exclude()
	@IsString()
	email: string
}
