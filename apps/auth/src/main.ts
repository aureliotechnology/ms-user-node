import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AuthModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
