import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
	private transporter: nodemailer.Transporter

	constructor(private readonly configService: ConfigService) {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: this.configService.get<string>('EMAIL_USER'),
				pass: this.configService.get<string>('EMAIL_PASSWORD')
			}
		})
	}

	async sendConfirmationEmail(to: string, token: string) {
		const clientUrl = this.configService.get<string>('CLIENT_URL')
		const confirmationLink = `${clientUrl}/user/confirm?token=${token}`

		await this.transporter.sendMail({
			to,
			subject: 'Подтверждение регистрации',
			// eslint-disable-next-line max-len
			html: `<p>Перейдите по ссылке для подтверждения email:</p><a href="${confirmationLink}">${confirmationLink}</a>`
		})
	}
}
