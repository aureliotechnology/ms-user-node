import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'server_error_log' })
export class ServerErrorLoggerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string

  @Column({ type: 'text' })
  stack: string
  
  @Column()
  context: string

  @CreateDateColumn()
  createdDate: Date
}


