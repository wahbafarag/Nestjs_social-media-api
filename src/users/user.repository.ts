import { Model } from 'mongoose';
import { User } from './schemas/users.schema';

export class UsersRepository {
  constructor(private readonly usersModel: Model<User>) {}
}
