import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Friends, friendsSchema } from './schemas/friend.schema';
import { FriendsRepository } from './friends.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Friends.name, schema: friendsSchema }]),
    UsersModule,
  ],
  providers: [FriendsService, FriendsRepository],
  controllers: [FriendsController],
})
export class FriendsModule {}
