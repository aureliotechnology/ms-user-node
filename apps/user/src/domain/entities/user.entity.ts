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

  setPass(pass: string): UserEntity {
    this.pass = pass;
    return this;
  }

  checkPass(pass: string): boolean {
    if(this.pass === pass){
      return true
    }
    return false
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


