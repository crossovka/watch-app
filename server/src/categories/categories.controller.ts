import { Controller, Post, Get, Param, Patch, Delete, Body } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoryService: CategoriesService) {}

	@Post()
	create(@Body() dto: CreateCategoryDto) {
		return this.categoryService.create(dto)
	}

	@Get()
	findAll() {
		return this.categoryService.findAll()
	}

	@Get(':slug')
	findOne(@Param('slug') slug: string) {
		return this.categoryService.findOne(slug)
	}

	@Patch(':slug')
	update(@Param('slug') slug: string, @Body() dto: UpdateCategoryDto) {
		return this.categoryService.update(slug, dto)
	}

	@Delete(':slug')
	remove(@Param('slug') slug: string) {
		return this.categoryService.delete(slug)
	}
}
