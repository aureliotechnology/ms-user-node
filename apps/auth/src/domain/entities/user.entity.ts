import { UserStatusEnum } from '../enums/user-status-enum';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  pass: string;

  @Column()
  name: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  @Generated('uuid')
  checkEmail: string;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    default: UserStatusEnum.INACTIVE,
  })
  status: UserStatusEnum;
  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @VersionColumn()
  version: number;

  @BeforeInsert()
  async setPass(pass: string): Promise<UserEntity> {
    this.pass = await bcrypt.hash(pass || this.pass);
    return this;
  }

  async checkPass(pass: string): Promise<boolean> {
    const auth = await bcrypt.compareSync(pass, this.pass);
    await bcrypt.compareSync(pass, this.pass, function(err, result) {
      if (err) { throw (err); }
      console.log(result);
  });
    return(!!auth)
  }

  public changeStatus(status: UserStatusEnum): UserEntity {
    this.status = status;
    return this;
  }

  public changeEmail(email: string): UserEntity {
    this.email = email;
    return this;
  }

  public changePhone(phone: string): UserEntity {
    this.phone = phone;
    return this;
  }

  public changeName(name: string): UserEntity {
    this.name = name;
    return this;
  }

  public emailConfirm(code: string): void {
    if (this.checkEmail === code) {
      this.status = UserStatusEnum.ACTIVE;
      this.checkEmail = null;
    }
    throw new HttpException('Código inválido', HttpStatus.BAD_REQUEST);
  }
}
