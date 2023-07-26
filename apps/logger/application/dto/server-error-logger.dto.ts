import { IsString } from 'class-validator';

export class ServerErrorLoggerDto {

  @IsString()
  message: string

  @IsString()
  stack: string
  
  @IsString()
  context: string

}
