import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserStatusEnum } from '../../domain/enums/user-status-enum';

@Injectable()
export class UserAuthUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(email: string, pass: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({
      email: email,
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    if (user.status !== UserStatusEnum.ACTIVE) {
      throw new HttpException('Usuário não está ativo', HttpStatus.BAD_REQUEST);
    }

    const auth = user.checkPass(pass)
    if (!auth) {
      throw new HttpException('Usuário inválido', HttpStatus.BAD_REQUEST);
    }

    if (user.verification !== null) {
      throw new HttpException('Email não confirmado', HttpStatus.BAD_REQUEST);
    }

    

    return user;
  }
}
