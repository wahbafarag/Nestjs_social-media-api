import { BadRequestException, Injectable } from '@nestjs/common';
import { LikesRepository } from './likes.repository';
import { PostsService } from '../posts/posts.service';
import { LikePostDto } from './dtos/like-post.dto';
import { ErrorCodes } from '../constants/error-codes';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly postsService: PostsService,
  ) {}

  async likePost(payload: LikePostDto, user: any) {
    const post = await this.postsService.FindOneById(payload.postId);
    const isLiked = await this.likesRepository.findOne({
      postId: payload.postId,
      userId: user._id,
    });
    if (isLiked) throw new BadRequestException(ErrorCodes.ALREADY_LIKED);
    const data = Object.assign(payload, { userId: user._id });
    const like = await this.likesRepository.likePost(data);
    post.whoLiked.push(like);
    post.likes = post.whoLiked.length;
    await post.save();

    return post;
  }

  async unlikePost(payload: LikePostDto, user: any) {
    const post = await this.postsService.FindOneById(payload.postId);

    const data = Object.assign(payload, { userId: user._id });
    const like = await this.likesRepository.findOne({
      postId: payload.postId,
      userId: user._id,
    });
    if (!like) throw new BadRequestException(ErrorCodes.NOT_LIKED);
    //await this.likesRepository.unlikePost(data);
    await like.deleteOne();
    await post.updateOne({ $pull: { whoLiked: like._id } });
    post.likes--;
    await post.save();
    return post;
  }
}
