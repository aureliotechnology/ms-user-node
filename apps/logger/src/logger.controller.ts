import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServerErrorLoggerUC } from '../application/use_case/server-error-logger-uc';
import { ServerErrorLoggerDto } from '../application/dto/server-error-logger.dto';

@Controller('logger')
export class LoggerController {
  constructor(private readonly serverErrorLoggerUC: ServerErrorLoggerUC) {}

  @Post('error-server')
  async errorServer(@Body() input: ServerErrorLoggerDto): Promise<boolean> {
    return this.serverErrorLoggerUC.execute(input);
  }
}
