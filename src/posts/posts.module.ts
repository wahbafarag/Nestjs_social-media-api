import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postSchema } from './schemas/post.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: postSchema }]),
    UsersModule,
  ],
  providers: [PostsService, PostsRepository],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
