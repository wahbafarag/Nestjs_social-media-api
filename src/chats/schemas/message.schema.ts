import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

@Schema({
  toJSON: { getters: true, virtuals: true },
  timestamps: true,
})
export class Message {
  @Prop({ required: true, type: String })
  text: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  receiver: Types.ObjectId;
}

export const messageSchema = SchemaFactory.createForClass(Message);
