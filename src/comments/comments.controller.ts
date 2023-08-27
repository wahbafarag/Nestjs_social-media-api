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
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoles } from '../users/schemas/users.schema';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { ParseIdPipe } from '../constants/parse-id.pipe';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { DeleteCommentDto } from './dtos/delete-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  create(
    @CurrentUser() user: any,
    @Body(ValidationPipe) body: CreateCommentDto,
  ) {
    const data = Object.assign(body, { user: user._id });
    return this.commentsService.create(data);
  }

  @Get('oneComment/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  FindOneById(@Param('id', ParseIdPipe) id: string) {
    return this.commentsService.FindOneById(id);
  }

  @Get('all-comments')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  FindAll() {
    return this.commentsService.FindAll();
  }

  @Get('post/:id/comments')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(UserRoles.USER)
  FindAllByPostId(@Param('id', ParseIdPipe) id: string) {
    return this.commentsService.FindAllByPostId(id);
  }

  @Patch('edit-comment/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  update(
    @CurrentUser() user: any,
    @Body() body: UpdateCommentDto,
    @Param('id', ParseIdPipe) id: string,
  ) {
    return this.commentsService.update(id, body, user._id);
  }

  @Delete('delete-comment')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.USER)
  delete(
    @Body(ValidationPipe) body: DeleteCommentDto,
    @CurrentUser() user: any,
  ) {
    return this.commentsService.delete(body, user);
  }
}
