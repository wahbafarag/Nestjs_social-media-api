import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, commentSchema } from './schemas/comment.schema';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: commentSchema }]),
    PostsModule,
  ],
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
