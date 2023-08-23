import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PasswordResetBodyDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
