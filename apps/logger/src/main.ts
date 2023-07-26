import { NestFactory } from '@nestjs/core';
import { LoggerModule } from './logger.module';

async function bootstrap() {
  const app = await NestFactory.create(LoggerModule);
  await app.listen(3002);
}
bootstrap();
