import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UserConfirmationUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(email: string, code: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      email: email,
    });

    user.emailConfirm(code);
    const userUpdate = await this.userRepository.update(user.id, user);
    return userUpdate.affected > 0 ?? false;
  }
}
