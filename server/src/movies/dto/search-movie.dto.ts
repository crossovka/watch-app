/* eslint-disable indent */
import { IsOptional, IsString, IsNumberString } from 'class-validator'

export class SearchMovieDto {
	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsNumberString()
	year?: string

	@IsOptional()
	@IsNumberString()
	minRating?: string

	@IsOptional()
	@IsNumberString()
	maxRating?: string

	@IsOptional()
	@IsString()
	categories?: string

	@IsOptional()
	@IsNumberString()
	page?: string

	@IsOptional()
	@IsNumberString()
	perPage?: string
}
