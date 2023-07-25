import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthUC } from './application/use_case/user-auth-uc';
import { UserAuthDto } from './application/dto/user-auth.dto';
import { UserEntity } from './domain/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly userAuthUC: UserAuthUC) {}

  @Post()
  async auth(@Body() data: UserAuthDto): Promise<UserEntity> {
    return this.userAuthUC.execute(data.email, data.pass);
  }
}
