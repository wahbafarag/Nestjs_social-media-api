import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { messageSchema } from './schemas/message.schema';
import { ChatGateway } from './chat.gateway';
import { ChatsRepository } from './chats.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: messageSchema }]),
    AuthModule,
  ],
  providers: [ChatsService, ChatGateway, ChatsRepository],
  controllers: [ChatsController],
})
export class ChatsModule {}
