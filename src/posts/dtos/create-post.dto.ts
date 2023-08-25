import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../users/schemas/users.schema';

export class Content {
  @IsString()
  @IsNotEmpty({ message: 'Post Caption is required' })
  caption: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class CreatePostDto {
  @IsNotEmpty({ message: 'Post Content is required' })
  content: Content;

  @IsEmpty()
  userId: User;
}
