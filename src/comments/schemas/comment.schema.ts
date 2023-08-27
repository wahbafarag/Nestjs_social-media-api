import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/users.schema';
import { Post } from '../../posts/schemas/post.schema';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true, type: String })
  text: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  // likes: string[];

  // replies: string[];
}

export const commentSchema = SchemaFactory.createForClass(Comment);
