import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { likeSchema } from './schemas/like.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Like', schema: likeSchema }])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
