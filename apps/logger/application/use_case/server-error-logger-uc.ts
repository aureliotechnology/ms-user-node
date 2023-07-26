import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerErrorLoggerEntity } from 'apps/logger/domain/entities/server-error-logger.entity';
import { Repository } from 'typeorm';
import { ServerErrorLoggerDto } from '../dto/server-error-logger.dto';

@Injectable()
export class ServerErrorLoggerUC {
  constructor(
    @InjectRepository(ServerErrorLoggerEntity)
    private readonly loggerRepository: Repository<ServerErrorLoggerEntity>,
  ) {}

  async execute(input: ServerErrorLoggerDto): Promise<boolean> {
    try {
      await this.loggerRepository.insert(input);
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}
