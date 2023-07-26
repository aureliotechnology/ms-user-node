import { Test, TestingModule } from '@nestjs/testing';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

describe('LoggerController', () => {
  let loggerController: LoggerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoggerController],
      providers: [LoggerService],
    }).compile();

    loggerController = app.get<LoggerController>(LoggerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(loggerController.getHello()).toBe('Hello World!');
    });
  });
});
