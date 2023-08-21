import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { ErrorCodes } from '../../constants/error-codes';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'LAZktM39ju2PoacfmlRtJAeX65APQfJGkV1Qnw',
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.usersService.findById(payload.id);
    if (!user) throw new BadRequestException(ErrorCodes.INVALID_TOKEN);
    return user;
  }
}
