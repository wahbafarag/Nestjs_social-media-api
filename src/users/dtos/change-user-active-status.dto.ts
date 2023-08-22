import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class ChangeUserActiveStatusDtoBody {
  @IsBoolean()
  isActive: boolean;
}

export class ChangeUserActiveStatusDtoParam {
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}
