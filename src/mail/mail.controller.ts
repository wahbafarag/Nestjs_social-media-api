import { Controller, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import * as process from 'process';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendTo')
  async sendTestEmail(@Query('email') email: any) {
    const mail = {
      to: email,
      from: process.env.SENDGRID_FROM,
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<strong>This is a test email</strong>',
    };
    console.log(mail);
    return await this.mailService.send(mail);
  }
}
