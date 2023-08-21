import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginPayloadWithUsername {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginPayloadWithEmail {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
