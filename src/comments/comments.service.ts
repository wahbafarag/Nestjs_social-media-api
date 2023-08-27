import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { PostsService } from '../posts/posts.service';
import { ErrorCodes } from '../constants/error-codes';
import { UpdateCommentDto } from './dtos/update-comment.dto';
import { DeleteCommentDto } from './dtos/delete-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsService: PostsService,
  ) {}

  async create(comment: CreateCommentDto) {
    const post = await this.postsService.FindOneById(comment.post);
    if (!post) throw new NotFoundException(ErrorCodes.POST_NOT_FOUND);

    const newComment = await this.commentsRepository.Create(comment);
    post.comments.push(newComment);
    await post.save();

    return newComment;
  }

  async FindOneById(id: string) {
    const comment = await this.commentsRepository.FindOneById({ _id: id });
    if (!comment) throw new NotFoundException(ErrorCodes.COMMENT_NOT_FOUND);

    return comment;
  }

  async FindAll() {
    return this.commentsRepository.FindAll();
  }

  async FindAllByPostId(postId: string) {
    const comments = await this.commentsRepository.FindAllByPostId(postId);

    if (comments.length === 0) return ErrorCodes.POST_HAS_NO_COMMENTS;
    return comments;
  }

  async update(commentId: string, data: UpdateCommentDto, userId: string) {
    const comment: any = await this.commentsRepository
      .FindOneById(commentId)
      .populate('user');

    if (!comment) throw new NotFoundException(ErrorCodes.COMMENT_NOT_FOUND);
    if (comment.user._id.toString() !== userId.toString())
      throw new NotFoundException(ErrorCodes.REJECT_COMMENT_EDIT);

    return this.commentsRepository.FindOneAndUpdate(commentId, data);
  }

  async delete(
    payload: DeleteCommentDto,
    user: any,
  ): Promise<{ code: string; message: string }> {
    const comment: any = await this.commentsRepository
      .FindOneById(payload.commentId)
      .populate('user');

    if (!comment) throw new NotFoundException(ErrorCodes.COMMENT_NOT_FOUND);
    if (comment.user._id.toString() !== user._id.toString())
      throw new NotFoundException(ErrorCodes.REJECT_COMMENT_DELETE);

    const post = await this.postsService.FindOneById(payload.postId);
    if (!post) throw new NotFoundException(ErrorCodes.POST_NOT_FOUND);

    await this.postsService.findOneAndUpdate(payload.postId, {
      $pull: { comments: payload.commentId },
    }); // pull out comment from postComments

    await this.commentsRepository.findOneAndDelete(payload.commentId); // delete comment

    return ErrorCodes.COMMENT_DELETED;
  }
}
