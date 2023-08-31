import { IsEmpty, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/schemas/users.schema';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEmpty() // comes from current user
  sender: User;

  @IsNotEmpty()
  @IsMongoId()
  receiver: User;
}
