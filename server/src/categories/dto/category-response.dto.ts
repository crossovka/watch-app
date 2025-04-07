import { Category } from '../entities/category.entity'

export class CategoryResponseDto {
	id: number
	name: string
	slug: string
	description?: string

	constructor(entity: Category) {
		this.id = entity.id
		this.name = entity.name
		this.slug = entity.slug
		this.description = entity.description
	}
}
