import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Category } from './entities/category.entity'

import { throwIfDuplicate, throwIfNotFound } from 'src/utils/http-exceptions'
import { generateSlug } from 'src/utils/slugify'

import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategoryResponseDto } from './dto/category-response.dto'

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepo: Repository<Category>
	) {}

	async create(dto: CreateCategoryDto): Promise<CategoryResponseDto> {
		const slug = generateSlug(dto.name)
		const exist = await this.categoryRepo.findOne({ where: { slug } })
		throwIfDuplicate(exist, 'Категория с таким slug уже существует')

		const category = this.categoryRepo.create({ ...dto, slug })
		await this.categoryRepo.save(category)

		return new CategoryResponseDto(category)
	}

	async findAll(): Promise<CategoryResponseDto[]> {
		const categories = await this.categoryRepo.find()
		return categories.map((cat) => new CategoryResponseDto(cat))
	}

	async findOne(slug: string): Promise<CategoryResponseDto> {
		const category = await this.categoryRepo.findOne({ where: { slug } })
		throwIfNotFound(category, 'Категория не найдена')
		return new CategoryResponseDto(category)
	}

	async update(slug: string, dto: UpdateCategoryDto): Promise<CategoryResponseDto> {
		const category = await this.categoryRepo.findOne({ where: { slug } })
		throwIfNotFound(category, 'Категория не найдена')

		if (dto.name) {
			const newSlug = generateSlug(dto.name)
			const duplicate = await this.categoryRepo.findOne({ where: { slug: newSlug } })
			if (duplicate && duplicate.id !== category.id) {
				throwIfDuplicate(duplicate, 'Категория с таким slug уже есть')
			}
			category.slug = newSlug
		}

		Object.assign(category, dto)
		await this.categoryRepo.save(category)

		return new CategoryResponseDto(category)
	}

	async delete(slug: string) {
		const category = await this.categoryRepo.findOne({ where: { slug } })
		throwIfNotFound(category, 'Категория не найдена')
		await this.categoryRepo.remove(category)
		return { message: 'Категория удалена' }
	}
}
