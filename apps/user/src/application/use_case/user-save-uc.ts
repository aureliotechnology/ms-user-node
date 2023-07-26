import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserSavaDto } from '../dto/user-save.dto';
import { IMailAdapter } from '../../infraestructure/mail/mail.adapter.interface';
import { MailAdapterDto } from '../../infraestructure/mail/mail.adapter.dto';

@Injectable()
export class UserSaveUC {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @Inject('IMailAdapter')
    private readonly mail:IMailAdapter
  ) {}

  async execute(input: UserSavaDto): Promise<UserEntity> {
    if(input.pass !== input.pass_confirmation) {
      throw new HttpException('Senha e confirmação de senha incorretos', HttpStatus.BAD_REQUEST);
    }

    const user = new UserEntity();
    user
      .setPass(input.pass)
      .changeName(input.name)
      .changeEmail(input.email)
      .changePhone(input.phone);
    try {
      const savedUser = await this.userRepository.save(user);
     
      const mail: MailAdapterDto = {
        to: user.email,
        subject: 'Confirme seu cadastro',
        text: `Olá ${user.name}, para confirmar seu cadastro na plataforma, acesse o link: ${user.verification}`,
        html: `<h4>Olá ${user.name},</h4><p>Para confirmar seu cadastro na plataforma, acesse o link abaixo: </p><p><a href="${user.verification}" target="_blank"><font color="#494949">${user.verification}</font></a></p>`
      }
      await this.mail.sendMail(mail)
      return savedUser;
    } catch (error) {
      if(error.code === '23505') {
        throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);
      }
      console.log(error)
      throw new HttpException('Erro ao salvar as informações', HttpStatus.BAD_REQUEST);
    }
  }
}
