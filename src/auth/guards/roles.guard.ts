import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '../../users/schemas/users.schema';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ErrorCodes } from '../../constants/error-codes';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new BadRequestException(ErrorCodes.UNAUTHORIZED);
    }
    return requiredRoles.some((role) => user.role === role);
    //return this.matchRoles(requiredRoles, user.role);
  }

  matchRoles(roles: UserRoles[], userRoles: UserRoles) {
    return roles.some((role) => userRoles === role);
  }
}
