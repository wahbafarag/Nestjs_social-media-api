import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friends } from './schemas/friend.schema';
import { Model } from 'mongoose';

@Injectable()
export class FriendsRepository {
  constructor(
    @InjectModel('Friends') private readonly friendsModel: Model<Friends>,
  ) {}

  Create(data: any) {
    return this.friendsModel.create(data);
  }

  FindAll(filter?: any) {
    return this.friendsModel.find(filter);
  }

  FindOne(filter: any) {
    return this.friendsModel.findOne(filter);
  }

  DeleteOne(filter: any) {
    return this.friendsModel.deleteOne(filter);
  }
}
