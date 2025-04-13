import { Category } from '../entities/category.entity'

export class CategoryNameDto {
	name: string
	slug: string

	constructor(category: Category) {
		this.name = category.name,
		this.slug = category.slug
	}
}
