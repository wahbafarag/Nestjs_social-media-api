import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { ChatsRepository } from './chats.repository';
import { CreateMessageDto } from './dtos/create-message.dto';

@Injectable()
export class ChatsService {
  constructor(
    private readonly authService: AuthService,
    private readonly chatsRepository: ChatsRepository,
  ) {}

  async getUserFromSocket(socket: Socket) {}

  async createMessage(message: CreateMessageDto) {
    return await this.chatsRepository.Create(message);
  }

  async getMessages(senderId: string, receiverId: string) {
    return this.chatsRepository.FindAll({
      sender: senderId,
      receiver: receiverId,
    });
  }
}
