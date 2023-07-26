import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserConfirmationCodeDto } from '../dto/user-confirmation-code.dto';

@Injectable()
export class UserConfirmationUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(data: UserConfirmationCodeDto): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      email: data.email,
    });

    if (!user)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

    if(!user.emailConfirm(data.code)){
      throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
    }
    const userUpdate = await this.userRepository.update(user.id, user);
    return userUpdate.affected > 0 ?? false;
  }
}
