import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';

export class PostsRepository {
  constructor(@InjectModel('Post') private readonly postsModel: Model<Post>) {}

  // async findAll(): Promise<Post[]> {
  //   return this.postsModel.find();
  // }

  async Create(data: any): Promise<Post> {
    return this.postsModel.create(data);
  }

  async FindOne(selector: any) {
    return this.postsModel.findOne(selector);
  }
}
