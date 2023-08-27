import { Injectable } from '@nestjs/common';
import { Like } from './schemas/like.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LikesRepository {
  constructor(@InjectModel(Like.name) private likeModel: Model<Like>) {}

  async likePost(data: any): Promise<Like> {
    return await this.likeModel.create(data);
  }

  async unlikePost(data: any) {
    return this.likeModel.deleteOne(data);
  }
}
