import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { OtpModule } from './otp/otp.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { FriendsModule } from './friends/friends.module';
import { SearchModule } from './search/search.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    MailModule,
    OtpModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    FriendsModule,
    SearchModule,
    FollowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
