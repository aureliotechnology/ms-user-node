import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRecoveryPassDto {
  @IsString()
  public code: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.[$&@#])[0-9a-zA-Z$*&@#]{8,}$/, {
    message: 'password too weak',
  })
  public pass: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  public pass_confirmation: string;
}
