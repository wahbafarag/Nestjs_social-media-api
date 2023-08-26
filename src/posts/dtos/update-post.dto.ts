import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class Content {
  @IsString()
  @IsNotEmpty({ message: 'Post Caption is required' })
  caption: string;

  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdatePostDto {
  @IsNotEmpty({ message: 'Post Content is required' })
  content: Content;
}
