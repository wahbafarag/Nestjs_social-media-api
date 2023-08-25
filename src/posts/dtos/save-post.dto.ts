import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SavePostDto {
  @IsString()
  @IsNotEmpty({ message: 'Post id is required' })
  @IsMongoId({ message: 'Post id is invalid' })
  postId: string;

  // @IsString()
  // @IsNotEmpty({ message: 'User id is required' })
  // @IsMongoId({ message: 'User id is invalid' })
  // userId: string;
}
