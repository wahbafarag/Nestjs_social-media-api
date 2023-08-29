import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './user.repository';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ErrorCodes } from '../constants/error-codes';
import { ChangeUserActiveStatusDtoParam } from './dtos/change-user-active-status.dto';
import { OtpService } from '../otp/otp.service';
import { MomentFormatEnum } from '../otp/constants/moment-format.enum';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { VerifyUserDto } from './dtos/verify-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
  ) {}

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

  async findOneAndUpdate(selector: any, action: any) {
    return await this.usersRepository.Update(selector, action);
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

  async changeUserIsActiveStatus(
    id: ChangeUserActiveStatusDtoParam,
    isActive: boolean,
  ) {
    if (!id) throw new BadRequestException(ErrorCodes.UNAUTHORIZED);

    return await this.usersRepository.Update({ _id: id }, { isActive });
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.usersRepository.FindOne({ email });
      if (user) {
        // generate a random token and expiry date
        let token = this.otpService.generateRandomTokenString(12);
        let expiryDate = this.otpService.generateExpiryDate(
          15,
          MomentFormatEnum.MINUTES,
        );

        // assign the token and expiry date to the user

        const updatedUser = await this.usersRepository.Update(
          { email },
          {
            passwordResetToken: token,
            passwordResetExpires: expiryDate,
          },
        );
        // get email data ready
        const emailData = {
          email: email,
          token: updatedUser.passwordResetToken,
          name: updatedUser.name,
        };
        return await this.mailService.sendResetPasswordEmail(emailData);
      } else {
        throw new BadRequestException(ErrorCodes.USER_NOT_FOUND);
      }
    } catch (error) {
      throw new InternalServerErrorException(ErrorCodes.UNEXPECTED_ERROR);
    }
  }

  async resetPassword(payload: ResetPasswordDto) {
    // get the user
    const user = await this.usersRepository.FindOne({ email: payload.email });
    if (!user) throw new BadRequestException(ErrorCodes.USER_NOT_FOUND);

    // tokens should be the same
    if (user.passwordResetToken !== payload.token)
      throw new BadRequestException(ErrorCodes.INVALID_TOKEN);

    // token should be valid
    const userTokenExpiryDate = user.passwordResetExpires;
    if (this.otpService.checkIfExpired(userTokenExpiryDate)) {
      const token = this.otpService.generateRandomTokenString(12);
      const expiryDate = this.otpService.generateExpiryDate(
        15,
        MomentFormatEnum.MINUTES,
      );
      const updatedUser = await this.usersRepository.Update(
        { email: payload.email },
        {
          passwordResetToken: token,
          passwordResetExpires: expiryDate,
        },
      );

      const emailData = {
        email: payload.email,
        token: updatedUser.passwordResetToken,
        name: updatedUser.name,
      };

      await this.mailService.sendResetPasswordEmail(emailData);
      throw new BadRequestException(ErrorCodes.EXPIRED_TOKEN);
    }

    // valid ? -> hash pass
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(payload.password, salt);
    const newUser = await this.usersRepository.Update(
      { email: payload.email },
      { password: hashedPassword },
    );
    if (!newUser)
      throw new InternalServerErrorException(ErrorCodes.UNEXPECTED_ERROR);
    return ErrorCodes.PASSWORD_UPDATED;
  }

  async delete(email: string) {
    return await this.usersRepository.Delete({ email });
  }

  async verifyUser(payload: VerifyUserDto) {
    const user = await this.usersRepository.FindOne({ email: payload.email });
    if (!user) throw new BadRequestException(ErrorCodes.USER_NOT_FOUND);
    if (
      await this.usersRepository.Update(
        { email: payload.email },
        {
          isVerified: true,
          isActive: true,
        },
      )
    ) {
      return ErrorCodes.USER_VERIFIED;
    } else {
      throw new InternalServerErrorException(ErrorCodes.UNEXPECTED_ERROR);
    }
  }

  async FindAll(filter?: any): Promise<User[]> {
    return await this.usersRepository.FindAll(filter);
  }
}
