import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { ResetPasswordInterface } from './interfaces/reset.password.interface';
import * as process from 'process';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_SECRET_KEY'));
    SendGrid.setSubstitutionWrappers('{{', '}}');
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    console.log(`E-Mail sent to ${mail.to}`);
    return transport;
  }

  async sendResetPasswordEmail(payload: ResetPasswordInterface) {
    const urlPath = 'http://localhost:3000/auth/reset-password';
    const mailData = {
      to: payload.email,
      from: process.env.SENDGRID_FROM,
      templateId: process.env.PASSWORD_RESET_TEMPLATE_ID,
      dynamic_template_data: {
        url: `${urlPath}?token=${payload.token}&Email=${payload.email}&type=reset-Password`,
        subject: 'Your Password Reset Token is Here',
        name: payload.name,
        token: payload.token,
      },
    };

    await this.send(mailData);
  }
}
