import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatsRepository {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Message>,
  ) {}

  Create(message: any) {
    return this.messageModel.create(message);
  }

  FindAll(filter?: any) {
    return this.messageModel
      .find(filter)
      .populate('user', 'name username id email');
  }
}
