import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ErrorCodes } from './error-codes';

@Injectable()
export class ParseIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any): Types.ObjectId {
    const isValidObjectId = Types.ObjectId.isValid(value);
    if (!isValidObjectId) {
      throw new BadRequestException(ErrorCodes.INVALID_ID);
    }
    return Types.ObjectId.createFromHexString(value);
  }
}
