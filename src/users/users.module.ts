import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './user.repository';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/users.schema';
import { OtpModule } from '../otp/otp.module';
import { MailModule } from '../mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OtpModule,
    MailModule,
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
