import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { ChatsRepository } from './chats.repository';
import { CreateMessageDto } from './dtos/create-message.dto';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';

@Injectable()
export class ChatsService {
  constructor(
    private readonly authService: AuthService,
    private readonly chatsRepository: ChatsRepository,
  ) {}

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.authUserToken(authenticationToken);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

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
