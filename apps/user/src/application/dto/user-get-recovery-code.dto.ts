import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserGetRecoveryCodeDto {

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  public type: string;

}
