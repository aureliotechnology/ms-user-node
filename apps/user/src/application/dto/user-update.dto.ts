import { IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  public id: string;

  @IsString()
  public name: string;

  @IsString()
  public phone: string;

  @IsString()
  public email: string;
}
