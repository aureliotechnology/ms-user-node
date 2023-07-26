import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserListUC } from './application/use_case/user-list-uc';
import { UserEntity } from './domain/entities/user.entity';
import { UserSaveUC } from './application/use_case/user-save-uc';
import { UserSavaDto } from './application/dto/user-save.dto';
import { UserDeleteUC } from './application/use_case/user-delete-uc';
import { UserViewUC } from './application/use_case/user-view-uc';
import { UserUpdateUC } from './application/use_case/user-update-uc';
import { UserUpdateDto } from './application/dto/user-update.dto';
import { UserIdDto } from './application/dto/user-id.dto';
import { UserRecoveryPassUC } from './application/use_case/user-recovery-pass-uc';
import { UserRecoveryPassDto } from './application/dto/user-recovery-pass.dto';
import { UserGetRecoveryCodeDto } from './application/dto/user-get-recovery-code.dto';
import { UserGetRecoveryCodeUC } from './application/use_case/user-get-code-uc';
import { UserConfirmationUC } from './application/use_case/user-confirmation-uc';
import { UserConfirmationCodeDto } from './application/dto/user-confirmation-code.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userSaveUC: UserSaveUC,
    private readonly userListeUc: UserListUC,
    private readonly userDeleteUc: UserDeleteUC,
    private readonly userViewUc: UserViewUC,
    private readonly userUpdateUc: UserUpdateUC,
    private readonly userRecoveryPass: UserRecoveryPassUC,
    private readonly userGetRecoveryCodeUC: UserGetRecoveryCodeUC,
    private readonly userConfirmationUC: UserConfirmationUC
  ) {}

  @Get()
  async list(): Promise<UserEntity[]> {
    return this.userListeUc.execute();
  }

  @Post()
  async create(@Body() data: UserSavaDto): Promise<UserEntity> {
    return this.userSaveUC.execute(data);
  }

  @Get('/:id')
  async view(@Param('id') data: UserIdDto) {
    return this.userViewUc.execute(data.id);
  }

  @Put('/')
  async update(@Body() data: UserUpdateDto): Promise<boolean> {
    return this.userUpdateUc.execute(data.id, data);
  }

  @Delete('/:id')
  async delete(@Param('id') data: UserIdDto) {
    return this.userDeleteUc.execute(data.id);
  }

  @Post('/recovery-pass')
  async recoveryPass(@Body() input: UserRecoveryPassDto): Promise<boolean> {
    return this.userRecoveryPass.execute(input)
  }

  @Post('/verification-code')
  async getCode(@Body() input: UserGetRecoveryCodeDto){
    
    return await this.userGetRecoveryCodeUC.execute(input);
  }

  @Post('/confirmation')
  async confirmation(@Body() input: UserConfirmationCodeDto ){
    
    return await this.userConfirmationUC.execute(input);
  }

}
