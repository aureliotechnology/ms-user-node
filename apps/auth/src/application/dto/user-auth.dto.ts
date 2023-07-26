import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserAuthDto {

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.[$&@#])[0-9a-zA-Z$*&@#]{8,}$/, {
    message: 'Dados inválidos',
  })
  public pass: string;
}
