import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware {
  use(req, res, next) {
    const log = {
      req: req,
      res: res,
      data: new Date()
    }
    console.log(log);
    next();
  }
}
