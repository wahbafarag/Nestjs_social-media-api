import { Body, Injectable, ValidationPipe } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import { SavePostDto } from './dtos/save-post.dto';
import { ErrorCodes } from '../constants/error-codes';
import { UsersService } from '../users/users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly usersService: UsersService,
  ) {}

  async Create(post: CreatePostDto, user: any): Promise<Post> {
    const data = Object.assign(post, { user: user._id });
    console.log(user);
    const newPost = await this.postsRepository.Create(data);
    user.posts.push(newPost);
    await user.save();
    return newPost;
  }

  async savePost(
    payload: SavePostDto,
    user: any,
  ): Promise<{ code: string; message: string }> {
    await this.usersService.findOneAndUpdate(
      { _id: user._id },
      { $push: { savedPosts: payload.postId } },
    );

    // const doc = await this.usersService.findById(user._id);
    // if (!doc) throw new BadRequestException(ErrorCodes.USER_NOT_FOUND);
    // const post = await this.postsRepository.FindOne({ _id: payload.postId });
    // doc.savedPosts.push(post);
    // await doc.save();
    return ErrorCodes.POST_SAVED;
  }

  async unSavePost(
    @Body(ValidationPipe) body: SavePostDto,
    @CurrentUser() user: any,
  ): Promise<{ code: string; message: string }> {
    await this.usersService.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedPosts: body.postId } },
    );
    return ErrorCodes.POST_UNSAVED;
  }
}
