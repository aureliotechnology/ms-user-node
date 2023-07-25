import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ValidationsUtils } from '../../infraestructure/validation.utils';

export class UserSavaDto {
  @IsString()
  public name: string;

  @IsString()
  @Matches(ValidationsUtils.phoneRegex, { message: 'Invalid phone' })
  public phone: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  public pass: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  public pass_confirmation: string;
}
