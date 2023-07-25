import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserUpdateDto } from '../dto/user-update.dto';

@Injectable()
export class UserUpdateUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(id: string, input: UserUpdateDto): Promise<boolean> {
    const userCurrent = await this.userRepository.findOneBy({ id: id });
    if (!userCurrent)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    userCurrent.changeName(input.name);
    userCurrent.changeEmail(input.email);
    userCurrent.changePhone(input.phone);
    const user = await this.userRepository.update(id, userCurrent);

    if (user.affected <= 0)
      throw new HttpException(
        'Falha ao editar o usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return true;
  }
}
