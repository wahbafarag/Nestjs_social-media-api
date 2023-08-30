import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FollowService } from './follow.service';
import { ParseIdPipe } from '../constants/parse-id.pipe';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoles } from '../users/schemas/users.schema';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('follow-user/:to')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  followUser(@Param('to', ParseIdPipe) to: string, @CurrentUser() user: any) {
    return this.followService.followUser(user._id, to);
  }

  @Post('unfollow-user/:to')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  unfollowUser(@Param('to', ParseIdPipe) to: string, @CurrentUser() user: any) {
    return this.followService.unfollowUser(user._id, to);
  }
}
