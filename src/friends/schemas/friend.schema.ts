import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Friends {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ default: false, type: Boolean })
  closeFriend: boolean;

  @Prop({ default: Date.now, type: Date })
  friendsSince: Date;
}

export const friendsSchema = SchemaFactory.createForClass(Friends);
