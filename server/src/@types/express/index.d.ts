declare global {
	namespace Express {
		interface Request {
			user: { id: number } // или типизируй полнее, если хочешь
		}
	}
}
