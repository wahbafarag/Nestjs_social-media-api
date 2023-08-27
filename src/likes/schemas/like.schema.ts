import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Like {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  postId: string;

  // genre: string;  // might add like to genre in the future (like , dislike , love , hate , etc..)

  // commentId: string;   // might add like to comment in the future
}

export const likeSchema = SchemaFactory.createForClass(Like);
