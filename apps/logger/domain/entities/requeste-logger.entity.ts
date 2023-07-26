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
export class RequestLoggerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

}


