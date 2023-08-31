import { IsEmpty, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEmpty() // comes from current user
  sender: string;

  @IsNotEmpty()
  @IsMongoId()
  receiver: string;
}
