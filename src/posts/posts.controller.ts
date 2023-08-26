import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
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
import { ParseIdPipe } from '../constants/parse-id.pipe';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Types } from 'mongoose';

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

  @Get('user-posts/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  async findPost(@Param('id', ParseIdPipe) id: string) {
    return this.postsService.FindOneById(id);
  }

  @Get('user-posts/user/:userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  async findUserPosts(@Param('userId', ParseIdPipe) userId: string) {
    return this.postsService.FindMany(userId);
  }

  @Get('user-posts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  async FindManyByUserIds(@Body() userIds: { userIds: string[] }) {
    const objIds = userIds.userIds.map((id) => new Types.ObjectId(id));
    return this.postsService.FindManyByUserIds(objIds);
  }

  @Get('saved-posts')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  async FindManyBySavedPostIds(
    @Body() savedPostIds: { savedPostIds: string[] },
  ) {
    const objIds = savedPostIds.savedPostIds.map(
      (id) => new Types.ObjectId(id),
    );
    return this.postsService.FindManyBySavedPostIds(objIds);
  }

  @Get('saved-posts/:userId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN)
  async FindManyBySavedPostIdsAndUserId(
    @Body() savedPostIds: { savedPostIds: string[] },
    @Param('userId', ParseIdPipe) userId: string,
  ) {
    const objIds = savedPostIds.savedPostIds.map(
      (id) => new Types.ObjectId(id),
    );
    return this.postsService.FindManyBySavedPostIdsAndUserId(objIds, userId);
  }

  @Get('all/saved-posts/posts/users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN)
  async FindManyBySavedPostIdsAndUserIds(
    @Body() savedPostIds: { savedPostIds: string[] },
    @Body() userIds: { userIds: string[] },
  ) {
    const savedObjIds = savedPostIds.savedPostIds.map(
      (id) => new Types.ObjectId(id),
    );
    const userObjIds = userIds.userIds.map((id) => new Types.ObjectId(id));
    return this.postsService.FindManyBySavedPostIdsAndUserIds(
      savedObjIds,
      userObjIds,
    );
  }

  @Patch('user-posts/:postId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  async findByUserIdAndUpdate(
    @Param('postId', ParseIdPipe) postId: string,
    @Body() data: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postsService.findByIdAndUpdate(postId, data, user);
  }

  @Delete('user-posts/:id/delete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  async deletePost(@Param('id', ParseIdPipe) postId: string) {
    return this.postsService.findByIdAndDelete(postId);
  }
}
