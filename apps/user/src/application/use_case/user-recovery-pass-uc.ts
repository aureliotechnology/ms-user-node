import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserRecoveryPassDto } from '../dto/user-recovery-pass.dto';

@Injectable()
export class UserRecoveryPassUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(input: UserRecoveryPassDto): Promise<boolean> {
    
    if(input.pass !== input.pass_confirmation) {
      throw new HttpException('Senha e confirmação de senha incorretos', HttpStatus.BAD_REQUEST);
    }

    const userCurrent = await this.userRepository.findOneBy({ email: input.email });

    if (!userCurrent)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    if(userCurrent.verification !== input.code)
      throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);

    userCurrent.setPass(input.pass);
    const user = await this.userRepository.update(userCurrent.id, userCurrent);

    if (user.affected <= 0)
      throw new HttpException(
        'Falha ao editar o usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return true;
  }
}
