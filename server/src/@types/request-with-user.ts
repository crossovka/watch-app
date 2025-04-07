import { Request } from 'express'

export interface RequestWithUser extends Request {
	user: {
		id: number
		email: string
		// добавь любые другие поля, если нужно
	}
}
