import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postSchema } from '../posts/schemas/post.schema';
import { userSchema } from '../users/schemas/users.schema';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: postSchema },
      { name: 'User', schema: userSchema },
    ]),
    UsersModule,
    PostsModule,
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
