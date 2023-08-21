import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { ErrorCodes } from '../contants/error-codes';
import {
  LoginPayloadWithEmail,
  LoginPayloadWithUsername,
} from './dtos/login-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { signToken } from '../helpers/sign-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(userInfo: CreateUserDto) {
    // const response = { data: null, error: null };
    const { password, username, email } = userInfo;

    // check if username is taken
    if (await this.usersService.findByUsername(username)) {
      // response.error = ErrorCodes.USERNAME_ALREADY_EXISTS;
      // return response;
      throw new BadRequestException(ErrorCodes.USERNAME_ALREADY_EXISTS);
    }

    // check if email is taken
    if (await this.usersService.findByEmail(email)) {
      // response.error = ErrorCodes.EMAIL_ALREADY_EXISTS;
      // return response;
      throw new BadRequestException(ErrorCodes.EMAIL_ALREADY_EXISTS);
    }

    // phone is taken
    if (await this.usersService.findByPhoneNumber(userInfo.phone)) {
      // response.error = ErrorCodes.PHONE_ALREADY_EXISTS;
      // return response;
      throw new BadRequestException(ErrorCodes.PHONE_ALREADY_EXISTS);
    }

    // all good ? hash pass and create user
    userInfo.password = await bcrypt.hash(password, 12);
    const user = await this.usersService.create(userInfo);
    const token = await signToken(user, this.jwtService);

    return { token, user };
  }

  async loginWithUsername(payload: LoginPayloadWithUsername) {
    const { username, password } = payload;

    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException(ErrorCodes.USERNAME_NOT_EXISTS);
    }

    if (user.isActive === false) {
      throw new BadRequestException(ErrorCodes.USER_NOT_ACTIVE);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(ErrorCodes.INVALID_CREDENTIALS);
    }

    user.password = undefined;
    return { token: await signToken(user, this.jwtService), user };
  }

  async loginWithEmail(payload: LoginPayloadWithEmail) {
    const { email, password } = payload;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(ErrorCodes.EMAIL_NOT_EXISTS);
    }

    if (user.isActive === false) {
      throw new BadRequestException(ErrorCodes.USER_NOT_ACTIVE);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException(ErrorCodes.INVALID_CREDENTIALS);
    }
    user.password = undefined;
    const token = await signToken(user, this.jwtService);
    return { token, user };
  }

  async findOne(email: any) {
    return await this.usersService.findByEmail(email);
  }
}
