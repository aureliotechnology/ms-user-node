import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { UserEntity } from './domain/entities/user.entity';
import { UserSaveUC } from './application/use_case/user-save-uc';
import { UserListUC } from './application/use_case/user-list-uc';
import { UserViewUC } from './application/use_case/user-view-uc';
import { UserUpdateUC } from './application/use_case/user-update-uc';
import { UserDeleteUC } from './application/use_case/user-delete-uc';
import { UserRecoveryPassUC } from './application/use_case/user-recovery-pass-uc';
import { LoggerMiddleware } from './infraestructure/middleware/logger.middleware';
import { UserGetRecoveryCodeUC } from './application/use_case/user-get-code-uc';

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
        entities: [UserEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserSaveUC,
    UserListUC,
    UserViewUC,
    UserUpdateUC,
    UserDeleteUC,
    UserRecoveryPassUC,
    UserGetRecoveryCodeUC,
  ],
})
export class UserModule { 
  // configure(consumer) {
  //   consumer
  //   .apply(LoggerMiddleware)
  //   .forRoutes(UserController);
  // }
}
