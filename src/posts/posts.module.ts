import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [],
  providers: [PostsService, PostsRepository],
  controllers: [PostsController],
})
export class PostsModule {}
