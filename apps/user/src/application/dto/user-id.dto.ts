import { IsString } from 'class-validator';

export class UserIdDto {
  @IsString()
  public id: string;
}
