import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  // @IsBoolean()
  // isVerified: boolean;
  //
  // @IsBoolean()
  // isActive: boolean;
}
