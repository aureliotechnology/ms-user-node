import { Catch, HttpException } from '@nestjs/common';
import { RegisterLogger } from '../logger/register.logger';
import * as fs from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter {
  constructor(
  ){}

  async catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    
    

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });


      // fs.stat('/Users/pauloluan/test.txt', (err, stats) => {
      //   if (err) {
      //     console.error(err)
      //     return
      //   }
      //   // nós temos acesso aos detalhes do arquivo no `stats`
      // })

  }
}