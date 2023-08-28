import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { likeSchema } from './schemas/like.schema';
import { LikesRepository } from './likes.repository';
import { postSchema } from '../posts/schemas/post.schema';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Like', schema: likeSchema },
      { name: 'Post', schema: postSchema },
    ]),
    PostsModule,
  ],
  providers: [LikesService, LikesRepository],
  controllers: [LikesController],
})
export class LikesModule {}
