import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ServerErrorLoggerUC } from '../application/use_case/server-error-logger-uc';
import { ServerErrorLoggerEntity } from '../domain/entities/server-error-logger.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [ServerErrorLoggerEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ServerErrorLoggerEntity]),
  ],
  controllers: [LoggerController],
  providers: [ServerErrorLoggerUC],
})
export class LoggerModule {}
