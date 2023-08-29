import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';

export class PostsRepository {
  // async findAll(): Promise<Post[]> {
  //   return this.postsModel.find();
  // }

  constructor(@InjectModel('Post') private readonly postsModel: Model<Post>) {}

  async Create(data: any): Promise<Post> {
    return this.postsModel.create(data);
  }

  async FindOne(selector: any) {
    return this.postsModel.findOne(selector);
  }

  // async findAll(selector?: any) {
  //   return this.postsModel.find(selector);
  // }

  async FindOneAndUpdate(selector: any, data: any) {
    return this.postsModel.findOneAndUpdate(selector, data, {
      new: true,
      runValidators: true,
    });
  }

  async FindOneAndDelete(selector: any) {
    return this.postsModel.findOneAndDelete(selector);
  }

  async FindMany(selector?: any) {
    return this.postsModel.find(selector).populate('user');
  }

  async FindManyAndDelete(selector: any) {
    return this.postsModel.deleteMany(selector);
  }
}
