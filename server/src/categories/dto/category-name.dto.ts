import { Category } from '../entities/category.entity'

export class CategoryNameDto {
	name: string

	constructor(category: Category) {
		this.name = category.name
	}
}
