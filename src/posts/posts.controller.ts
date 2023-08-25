import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRoles } from '../users/schemas/users.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PostsService } from './posts.service';
import { SavePostDto } from './dtos/save-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  create(@Body(ValidationPipe) body: CreatePostDto, @CurrentUser() user: User) {
    return this.postsService.Create(body, user);
  }

  @Post('save')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  savePost(@Body(ValidationPipe) body: SavePostDto, @CurrentUser() user: User) {
    return this.postsService.savePost(body, user);
  }

  @Post('un-save')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  unSavePost(
    @Body(ValidationPipe) body: SavePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postsService.unSavePost(body, user);
  }
}
