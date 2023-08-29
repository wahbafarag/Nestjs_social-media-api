import { Body, Injectable, ValidationPipe } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dtos/create-post.dto';
import { SavePostDto } from './dtos/save-post.dto';
import { ErrorCodes } from '../constants/error-codes';
import { UsersService } from '../users/users.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UpdatePostDto } from './dtos/update-post.dto';

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
  ): Promise<{
    code: string;
    message: string;
  }> {
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
  ): Promise<{
    code: string;
    message: string;
  }> {
    await this.usersService.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedPosts: body.postId } },
    );
    return ErrorCodes.POST_UNSAVED;
  }

  async FindOneById(id: string) {
    return await this.postsRepository.FindOne({ _id: id });
  }

  async FindMany(userId: string) {
    return this.postsRepository.FindMany({ user: userId });
  }

  async FindManyByUserIds(userIds: any) {
    return this.postsRepository.FindMany({ user: { $in: userIds } });
  }

  async FindManyBySavedPostIds(savedPostIds: any[]) {
    return this.postsRepository.FindMany({ _id: { $in: savedPostIds } });
  }

  async FindManyBySavedPostIdsAndUserId(savedPostIds: any[], userId: string) {
    return this.postsRepository.FindMany({
      _id: { $in: savedPostIds },
      user: userId,
    });
  }

  async FindManyBySavedPostIdsAndUserIds(savedPostIds: any[], userIds: any[]) {
    return this.postsRepository.FindMany({
      _id: { $in: savedPostIds },
      user: { $in: userIds },
    });
  }

  async findByIdAndUpdate(postId: string, data: UpdatePostDto, userId: any) {
    const post = await this.postsRepository.FindOne({ _id: postId });
    if (!post) return ErrorCodes.POST_NOT_FOUND;

    if (post.user.toString() !== userId._id.toString())
      return ErrorCodes.REJECT_POST_EDIT;
    return this.postsRepository.FindOneAndUpdate({ _id: postId }, data);
  }

  async findByIdAndDelete(id: string) {
    if (!(await this.postsRepository.FindOneAndDelete({ _id: id })))
      return ErrorCodes.POST_NOT_FOUND;
    await this.postsRepository.FindOneAndDelete({ _id: id });
    return ErrorCodes.POST_DELETED;
  }

  async findOneAndUpdate(id: any, data: any) {
    return this.postsRepository.FindOneAndUpdate({ _id: id }, data);
  }

  async findAll(selector?: any): Promise<any[]> {
    return await this.postsRepository.FindMany(selector);
  }
}
