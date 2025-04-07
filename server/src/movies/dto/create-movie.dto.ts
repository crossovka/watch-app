import { IsArray, IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateMovieDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsNumber()
	year: number

	@IsNumber()
	duration: number

	@IsNumber()
	rating: number

	@IsArray()
	categories: string[]

	@IsUrl()
	thumbnail: string

	@IsUrl()
	poster: string

	@IsUrl()
	videoUrl: string
}
