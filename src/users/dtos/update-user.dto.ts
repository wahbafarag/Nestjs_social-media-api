import {
  IsEmail,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class Address {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Country is required' })
  Country: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'City is required' })
  City: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Street is required' })
  Street: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Zip Code is required' })
  ZipCode: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  @IsOptional()
  email: string;

  @IsEmpty({
    message:
      'You can only update your info , changing passwords not allowed here',
  })
  password: string;

  @IsString()
  @IsPhoneNumber('EG', { message: 'Phone Number is not valid' })
  @IsNotEmpty({ message: 'Phone Number is required' })
  @IsOptional()
  phone: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsOptional()
  address: Address;

  @IsNumber()
  @IsInt({ message: 'Age must be an integer' })
  @IsNotEmpty({ message: 'Age is required' })
  @IsOptional()
  age: number;
}
