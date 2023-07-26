import { ConsoleLogger } from '@nestjs/common';
import axios from 'axios';

export class CustomLogger extends ConsoleLogger {
  async error(message: any, stack?: string, context?: string) {
  //   await axios.post('http://localhost:3002/logger/error-server', {
  //     message: message,
  //     stack: stack,
  //     context: context
  // })
    super.error(message, stack);
  }
}


