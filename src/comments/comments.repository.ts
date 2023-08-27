import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  Create(data: any) {
    return this.commentModel.create(data);
  }

  FindOneById(id: any) {
    return this.commentModel.findById(id);
  }

  FindAll() {
    return this.commentModel.find();
  }

  FindAllByPostId(postId: string) {
    return this.commentModel.find({ post: postId });
  }

  FindOneAndUpdate(id: string, data: any) {
    return this.commentModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }

  findOneAndDelete(id: string) {
    return this.commentModel.findOneAndDelete({ _id: id });
  }
}
