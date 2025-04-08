import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())

	// Устанавливаем глобальный префикс для API
	app.setGlobalPrefix('api')

	// Настройка CORS для работы с клиентом
	// app.use(
	// 	cors({
	// 		origin: 'http://localhost:3001', // Укажите ваш клиентский URL
	// 		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	// 		allowedHeaders: ['Content-Type', 'Authorization'],
	// 		credentials: true
	// 	})
	// )
	app.enableCors({
		origin: 'http://localhost:3001',
		credentials: true
	})

	// 💥 Раздача папки uploads
	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

	// Запуск сервера
	await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
