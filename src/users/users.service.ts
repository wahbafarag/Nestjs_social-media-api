import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ErrorCodes } from '../contants/error-codes';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(userInfo: CreateUserDto): Promise<User> {
    return await this.usersRepository.Create(userInfo);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.FindOne({ email });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.FindOne({ username });
  }

  async findById(id: string): Promise<User> {
    return await this.usersRepository.FindOne({ _id: id });
  }

  async findByPhoneNumber(phone: string): Promise<User> {
    return await this.usersRepository.FindOne({ phone });
  }

  async updateById(id: string, userInfo: UpdateUserDto): Promise<User> {
    if (userInfo.password)
      throw new BadRequestException(ErrorCodes.UNSUPPORTED_ACTION);
    const user = await this.usersRepository.Update({ _id: id }, userInfo);
    if (!user) throw new NotFoundException(ErrorCodes.USER_NOT_FOUND);
    return user;
  }

  async updateByEmail(email: string, userInfo: UpdateUserDto): Promise<User> {
    if (userInfo.password)
      throw new BadRequestException(ErrorCodes.UNSUPPORTED_ACTION);
    const user = await this.usersRepository.Update({ email }, userInfo);
    if (!user) throw new NotFoundException(ErrorCodes.USER_NOT_FOUND);
    return user;
  }

  async updateByUsername(
    username: string,
    userInfo: UpdateUserDto,
  ): Promise<User> {
    if (userInfo.password)
      throw new BadRequestException(ErrorCodes.UNSUPPORTED_ACTION);
    const user = await this.usersRepository.Update({ username }, userInfo);
    if (!user) throw new NotFoundException(ErrorCodes.USER_NOT_FOUND);
    return user;
  }
}
