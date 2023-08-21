import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel('User') private readonly usersModel: Model<User>) {}

  async Create(data: any): Promise<User> {
    return await this.usersModel.create(data);
  }

  FindOne(selector: any): Promise<User> {
    return this.usersModel.findOne(selector).populate('password');
  }

  // update or deactivate
  Update(selector: any, data: any): Promise<User> {
    return this.usersModel.findOneAndUpdate(selector, data, {
      new: true,
      runValidators: true,
    });
  }

  // permanent delete
  Delete(selector: any): Promise<User> {
    return this.usersModel.findOneAndDelete(selector);
  }
}
