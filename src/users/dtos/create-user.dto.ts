import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class Address {
  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  Country: string;

  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  City: string;

  @IsString()
  @IsNotEmpty({ message: 'Street is required' })
  Street: string;

  @IsString()
  @IsNotEmpty({ message: 'Zip Code is required' })
  ZipCode: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(25, { message: 'Password must be at least 25 characters' })
  password: string;

  @IsString()
  @IsPhoneNumber('EG', { message: 'Phone Number is not valid' })
  @IsNotEmpty({ message: 'Phone Number is required' })
  phone: string;

  @IsNotEmpty({ message: 'Address is required' })
  address: Address;

  @IsNumber()
  @IsInt({ message: 'Age must be an integer' })
  @IsNotEmpty({ message: 'Age is required' })
  age: number;
}
