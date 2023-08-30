import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Follow {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  to: Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  from: Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const followSchema = SchemaFactory.createForClass(Follow);
