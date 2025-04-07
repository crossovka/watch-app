/* eslint-disable indent */
import { IsArray, IsNumber, IsString, IsUrl } from 'class-validator'

export class CreateMovieDto {
	@IsString()
	title: string

	@IsString()
	description: string

	@IsNumber()
	year: number

	@IsNumber()
	rating: number

	@IsArray()
	categories: string[]

	@IsUrl()
	thumbnail: string

	@IsUrl()
	videoUrl: string
}
