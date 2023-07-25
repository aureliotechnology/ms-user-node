import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserGetRecoveryCodeDto } from '../dto/user-get-recovery-code.dto';

@Injectable()
export class UserGetRecoveryCodeUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(input: UserGetRecoveryCodeDto): Promise<void> {
    const userCurrent = await this.userRepository.findOneBy({ email: input.email });

    if (!userCurrent){
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    //TODO
    // Send mail
    userCurrent.setNewCode();
    await this.userRepository.update(userCurrent.id, userCurrent);

  }
}
