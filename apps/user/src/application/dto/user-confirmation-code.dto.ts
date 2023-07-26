import {
  IsEmail,
  IsString
} from 'class-validator';

export class UserConfirmationCodeDto {

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  public code: string;

}
