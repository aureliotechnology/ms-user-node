import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserDeleteUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(id: string): Promise<boolean> {
    const user = await this.userRepository.softDelete(id);
    if (user.affected > 0 ?? false)
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    return true;
  }
}
