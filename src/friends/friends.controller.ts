import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserRoles } from '../users/schemas/users.schema';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ParseIdPipe } from '../constants/parse-id.pipe';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('add-friend/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  addFriend(
    @CurrentUser() currentUser: any,
    @Param('userId', ParseIdPipe) userId: string,
  ) {
    return this.friendsService.addFriend(userId, currentUser);
  }

  @Post('remove-friend/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  removeFriend(
    @CurrentUser() currentUser: any,
    @Param('userId', ParseIdPipe) userId: string,
  ) {
    return this.friendsService.removeFriend(userId, currentUser);
  }
}
