import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import {
  LoginPayloadWithEmail,
  LoginPayloadWithUsername,
} from './dtos/login-payload.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body(ValidationPipe) userInfo: CreateUserDto) {
    return this.authService.signup(userInfo);
  }

  @Public() // no role required
  @Post('login/with-username')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  loginWithUsername(@Body(ValidationPipe) payload: LoginPayloadWithUsername) {
    return this.authService.loginWithUsername(payload);
  }

  @Public() // no role required
  @Post('login/with-email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  loginWithEmail(@Body(ValidationPipe) payload: LoginPayloadWithEmail) {
    return this.authService.loginWithEmail(payload);
  }
}
