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
  @Matches(ValidationsUtils.phoneRegex, { message: 'Telefone inválido' })
  public phone: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.[$&@#])[0-9a-zA-Z$*&@#]{8,}$/, {
    message: 'Senha inválida',
  })
  public pass: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  public pass_confirmation: string;
}
