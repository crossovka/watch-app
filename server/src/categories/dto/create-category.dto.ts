/* eslint-disable indent */
import { IsOptional, IsString, IsUrl } from 'class-validator'

export class CreateCategoryDto {
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	description?: string

	@IsUrl()
	thumbnail: string
}
