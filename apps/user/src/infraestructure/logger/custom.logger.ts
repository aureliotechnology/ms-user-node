import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    console.log('!!!!!!!!!!!!!!!!!!!!');
    super.error(message, stack);
  }
}


