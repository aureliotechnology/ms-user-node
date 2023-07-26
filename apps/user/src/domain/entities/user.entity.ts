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
import {v4 as uuidv4} from 'uuid';

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
  verification: string;

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
    const salt = await bcrypt.genSalt();
    this.pass = await bcrypt.hash(pass || this.pass, salt);
    return this;
  }

  async checkPass(pass: string): Promise<boolean> {
    return await bcrypt.compare(pass, this.pass);
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

  public setNewCode() {
      this.verification = uuidv4();
  }

  public emailConfirm(code: string): boolean {
    if (this.verification === code) {
      this.status = UserStatusEnum.ACTIVE;
      this.verification = null;
      return true;
    }
    return false;
  }
}


