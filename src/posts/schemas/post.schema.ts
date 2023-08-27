import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/users.schema';

export class Content {
  // at least give us some text out of the post
  @Prop({ type: String, required: true })
  caption: string;

  @Prop({ type: String })
  image?: string;
}

function commentsCount(): number {
  return this.comments ? this.comments.length : 0;
}

@Schema()
export class Post {
  @Prop({ type: Content, required: true })
  content: Content;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt?: Date;

  @Prop({ type: Date })
  deletedAt?: Date;

  @Prop({ type: Number, default: 0 })
  sharesCount?: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  whoShared?: Post[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  whoLiked?: Post[];

  @Prop({ type: Number, default: 0 })
  likes?: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  whoDisliked?: Post[];

  @Prop({ type: Number, default: 0 })
  dislikes?: number;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  comments?: Comment[];

  @Prop({ type: Number, default: commentsCount })
  commentCount?: number;
}

export const postSchema = SchemaFactory.createForClass(Post);

// @Prop({ type: Boolean, default: false })
// isDeleted?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isEdited?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isPinned?: boolean;

//

// @Prop({ type: Boolean, default: false })
// isReported?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isApproved?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isRejected?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isBlocked?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isBanned?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isSpam?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isVerified?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isHidden?: boolean;
//
// @Prop({ type: Boolean, default: false })
// isClosed?: boolean;
//
