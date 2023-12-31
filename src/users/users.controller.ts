import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ParseIdPipe } from '../constants/parse-id.pipe';
import { ErrorCodes } from '../constants/error-codes';
import { User, UserRoles } from './schemas/users.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  ChangeUserActiveStatusDtoBody,
  ChangeUserActiveStatusDtoParam,
} from './dtos/change-user-active-status.dto';
import { PasswordResetBodyDto } from './dtos/password-reset-body.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { VerifyUserDto } from './dtos/verify-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.BAD_REQUEST)
  create() {
    throw new BadRequestException(ErrorCodes.INVALID_REQUEST);
  }

  @Public()
  @Get('emails/:email')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN)
  async findByEmail(@Param('email') email: string) {
    return await this.usersService.findByEmail(email);
  }

  @Public()
  @Get('usernames/:username')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN, UserRoles.USER)
  async findByUsername(@Param('username') username: string) {
    return await this.usersService.findByUsername(username);
  }

  @Get('ids/:id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRoles.ADMIN)
  async findById(@Param('id', ParseIdPipe) id: string) {
    return await this.usersService.findById(id);
  }

  @Get('phones/:phone')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  async findByPhoneNumber(
    @Param('phone') phone: string,
    @CurrentUser() user: User,
  ): Promise<User> {
    if (!(await this.usersService.findByPhoneNumber(phone))) {
      throw new BadRequestException(ErrorCodes.USER_NOT_FOUND);
    }
    return await this.usersService.findByPhoneNumber(phone);
  }

  @Patch('profiles/ids/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  updateById(
    @Param('id', ParseIdPipe) id: string,
    @Body() userInfo: UpdateUserDto,
  ) {
    return this.usersService.updateById(id, userInfo);
  }

  @Patch('profiles/usernames/:username')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  updateByUsername(
    @Param('username') username: string,
    @Body() userInfo: UpdateUserDto,
  ) {
    return this.usersService.updateByUsername(username, userInfo);
  }

  @Patch('profiles/emails/:email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  updateByEmail(
    @Param('email') email: string,
    @Body() userInfo: UpdateUserDto,
  ) {
    return this.usersService.updateByEmail(email, userInfo);
  }

  @Patch('profiles/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  updateProfile(@CurrentUser() user: User, @Body() userInfo: UpdateUserDto) {
    if (!user) throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
    if (userInfo.password)
      throw new BadRequestException(ErrorCodes.UNSUPPORTED_ACTION);

    const { username } = user;
    return this.usersService.updateByUsername(username, userInfo);
  }

  @Get('profiles/me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  getProfile(@CurrentUser() user: User) {
    if (!user) throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
    const { username } = user;
    return this.usersService.findByUsername(username);
  }

  @Put(':id/active-status')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  async changeActiveStatus(
    @Body() body: ChangeUserActiveStatusDtoBody,
    @Param('id', ParseIdPipe) id: ChangeUserActiveStatusDtoParam,
  ) {
    await this.usersService.changeUserIsActiveStatus(id, body.isActive);
    if (body.isActive === true) return ErrorCodes.USER_ACTIVATED;
    return ErrorCodes.USER_DEACTIVATED;
  }

  @Post('password/forgot')
  @HttpCode(HttpStatus.OK)
  @Public()
  async forgotPassword(@Body(ValidationPipe) payload: PasswordResetBodyDto) {
    const { email } = payload;
    return await this.usersService.forgotPassword(email);
  }

  @Post('password/reset')
  @HttpCode(HttpStatus.OK)
  @Public()
  async resetPassword(@Body(ValidationPipe) payload: ResetPasswordDto) {
    return await this.usersService.resetPassword(payload);
  }

  @Patch('verify')
  @HttpCode(HttpStatus.OK)
  @Public()
  async verifyUser(@Body(ValidationPipe) payload: VerifyUserDto) {
    return await this.usersService.verifyUser(payload);
  }

  @Delete('profiles/delete-me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  async deleteProfile(
    @CurrentUser() user: User,
    @Body(ValidationPipe) body: PasswordResetBodyDto,
  ) {
    if (!user) throw new UnauthorizedException(ErrorCodes.UNAUTHORIZED);
    const { email } = user;
    if (user.email !== body.email)
      throw new BadRequestException(ErrorCodes.INVALID_DELETE_REQUEST);
    if (await this.usersService.delete(email)) return ErrorCodes.USER_DELETED;
    throw new InternalServerErrorException(ErrorCodes.UNEXPECTED_ERROR);
  }

  @Get('all-users')
  FindAll() {
    return this.usersService.FindAll();
  }
}
