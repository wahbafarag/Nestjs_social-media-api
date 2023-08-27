import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class DeleteCommentDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  commentId: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  postId: string;
}
