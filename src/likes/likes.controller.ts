import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoles } from '../users/schemas/users.schema';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { LikePostDto } from './dtos/like-post.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('one-more-like')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  likePost(
    @CurrentUser() user: any,
    @Body(ValidationPipe) payload: LikePostDto,
  ) {
    console.log('user', user);
    return this.likesService.likePost(payload, user);
  }

  @Post('one-less-like')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  unlikePost(
    @CurrentUser() user: any,
    @Body(ValidationPipe) body: LikePostDto,
  ) {
    return this.likesService.unlikePost(body, user);
  }
}
