import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  getHello(): string {
    return 'Hello World!';
  }
}
