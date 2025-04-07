import { randomUUID } from 'crypto'

const cyrillicToLatinMap: Record<string, string> = {
	а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
	з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
	п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts',
	ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
}

function transliterate(text: string): string {
	return text
		.toLowerCase()
		.split('')
		.map(char => cyrillicToLatinMap[char] ?? char)
		.join('')
}

export function generateSlug(title: string): string {
	if (!title) {
		throw new Error('generateSlug: передан пустой title')
	}
	const transliterated = transliterate(title)

	const baseSlug = transliterated
		.replace(/[^a-z0-9\s-]/g, '') // только латиница, цифры, пробелы и дефисы
		.replace(/\s+/g, '-')         // пробелы → дефисы
		.replace(/-+/g, '-')          // несколько дефисов → один
		.replace(/^-+|-+$/g, '')      // убираем дефисы в начале/конце

	const uid = randomUUID().split('-')[0] // короткий уникальный id

	return `${baseSlug}-${uid}`
}
