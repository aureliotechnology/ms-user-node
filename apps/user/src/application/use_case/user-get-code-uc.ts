import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserGetRecoveryCodeDto } from '../dto/user-get-recovery-code.dto';
import { MailAdapterDto } from '../../infraestructure/mail/mail.adapter.dto';
import { IMailAdapter } from '../../infraestructure/mail/mail.adapter.interface';

@Injectable()
export class UserGetRecoveryCodeUC {
  constructor(
    @Inject('IMailAdapter')
    private readonly mail:IMailAdapter,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async execute(input: UserGetRecoveryCodeDto): Promise<void> {
    const userCurrent = await this.userRepository.findOneBy({ email: input.email });

    if (!userCurrent){
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }
    userCurrent.setNewCode();

    if(input.type === 'EMAIL'){
      const mail: MailAdapterDto = {
        to: userCurrent.email,
        subject: 'Confirme seu cadastro',
        text: `Olá ${userCurrent.name}, para confirmar seu cadastro na plataforma, acesse o link: ${userCurrent.verification}`,
        html: `<h4>Olá ${userCurrent.name},</h4><p>Para confirmar seu cadastro na plataforma, acesse o link abaixo: </p><p><a href="${userCurrent.verification}" target="_blank"><font color="#494949">${userCurrent.verification}</font></a></p>`
      }
      await this.mail.sendMail(mail)
    }

    if(input.type === 'PASS'){
      const mail: MailAdapterDto = {
        to: userCurrent.email,
        subject: 'Recuperar senha',
        text: `Olá ${userCurrent.name}, recebemos uma solicitação para uma nova na plataforma, acesse o link: ${userCurrent.verification}`,
        html: `<h4>Olá ${userCurrent.name},</h4><p>Recebemos uma solicitação para uma nova na plataforma, acesse o link abaixo: </p><p><a href="${userCurrent.verification}" target="_blank"><font color="#494949">${userCurrent.verification}</font></a></p>`
      }
      await this.mail.sendMail(mail)
    }
    
    await this.userRepository.update(userCurrent.id, userCurrent);

  }
}
