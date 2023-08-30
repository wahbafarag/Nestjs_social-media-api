import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { followSchema } from './schemas/follow.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Follow', schema: followSchema }]),
    UsersModule,
  ],
  providers: [FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
