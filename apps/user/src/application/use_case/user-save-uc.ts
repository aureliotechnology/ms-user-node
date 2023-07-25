import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserSavaDto } from '../dto/user-save.dto';

@Injectable()
export class UserSaveUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(input: UserSavaDto): Promise<UserEntity> {
    const user = new UserEntity();
    await user.setPass(input.pass);
    user
      .changeName(input.name)
      .changeEmail(input.email)
      .changePhone(input.email);
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }
}
