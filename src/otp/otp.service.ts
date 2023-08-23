import { Injectable } from '@nestjs/common';
import { MomentFormatEnum } from './constants/moment-format.enum';
import * as moment from 'moment';

@Injectable()
export class OtpService {
  generateRandomTokenString(length: number) {
    let chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  generateExpiryDate(stayFor: number, unit: MomentFormatEnum) {
    return moment.utc().add(stayFor, unit).format();
  }

  checkIfExpired(expiryDate: Date) {
    return moment.utc().isAfter(expiryDate);
  }
}
