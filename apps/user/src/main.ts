import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    UserModule,
    new FastifyAdapter()
  );
  await app.listen(3000);
}
bootstrap();
