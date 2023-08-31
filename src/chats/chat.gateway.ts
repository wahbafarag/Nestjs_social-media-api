import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatsService } from './chats.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatsService,
    private readonly usersService: UsersService,
  ) {}

  async handleConnection(socket: Socket) {
    await this.chatService.getUserFromSocket(socket);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(
    @MessageBody() messageData: { content: string; recipientId: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const sender = await this.chatService.getUserFromSocket(socket);
    const receiver = await this.usersService.findById(messageData.recipientId);

    if (!receiver) {
      socket.emit('error_message', 'Invalid recipient');
      return;
    }
    const message = await this.chatService.createMessage({
      text: messageData.content,
      sender,
      receiver,
    });
    this.server.sockets.emit('receive_message', message);
    return message;
  }

  @SubscribeMessage('request_all_messages')
  async requestAllMessages(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    messageData: {
      recipientId: string;
    },
  ) {
    const user = await this.chatService.getUserFromSocket(socket);

    const messages = await this.chatService.getMessages(
      user.id,
      messageData.recipientId,
    );

    socket.emit('send_all_messages', messages);
  }
}
