import { IsEmpty, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/schemas/users.schema';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEmpty()
  user: User;

  @IsMongoId()
  @IsNotEmpty({ message: 'Post id is required' })
  post: string;
}
