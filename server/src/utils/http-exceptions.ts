import { BadRequestException, NotFoundException } from '@nestjs/common'

/**
 * Throws a {@link NotFoundException} if the provided entity is not found.
 */
export function throwIfNotFound(entity: unknown, message: string): void {
	if (!entity) {
		throw new NotFoundException(message)
	}
}

/**
 * Throws a {@link BadRequestException} if the provided entity exists.
 */
export function throwIfDuplicate(entity: unknown, message: string): asserts entity {
	if (entity) {
		throw new BadRequestException(message)
	}
}
