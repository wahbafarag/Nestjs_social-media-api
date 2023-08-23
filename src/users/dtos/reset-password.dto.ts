import { IsNotEmpty, IsString } from 'class-validator';

function passwordsMatch(value: string, { object }: any): boolean {
  return value === object.newPassword;
}

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
