import { Category } from '../entities/category.entity'

export class CategoryShortDto {
	id: number
	name: string
	slug: string
	thumbnail: string

	constructor(category: Category) {
		this.id = category.id
		this.name = category.name
		this.slug = category.slug
		this.thumbnail = category.thumbnail
	}
}
