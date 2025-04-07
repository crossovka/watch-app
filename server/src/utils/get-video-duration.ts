// import { getVideoDurationInSeconds } from 'get-video-duration'
// import fs from 'fs'

// export async function getVideoDuration(videoUrl: string): Promise<number> {
// 	const stream = fs.createReadStream(videoUrl)
// 	const duration = await getVideoDurationInSeconds(stream)
// 	return Math.floor(duration)
// }

import { getVideoDurationInSeconds } from 'get-video-duration'
import * as fs from 'fs'
import * as path from 'path'
import { BadRequestException } from '@nestjs/common'

export async function getVideoDuration(videoUrl: string): Promise<number> {
	try {
		const fileName = videoUrl.replace(/^.*\/uploads\//, '') // e.g. "video.mp4"
		const absolutePath = path.join(process.cwd(), 'uploads', fileName)

		console.log('⏱️ Получаем длительность для:', absolutePath)

		if (!fs.existsSync(absolutePath)) {
			throw new Error('Файл не найден: ' + absolutePath)
		}

		const stream = fs.createReadStream(absolutePath)
		const duration = await getVideoDurationInSeconds(stream)
		return Math.floor(duration)
	} catch (err: any) {
		console.error('⛔ Ошибка при получении длительности:', err.message)
		throw new BadRequestException('Ошибка при получении длительности видео')
	}
}
