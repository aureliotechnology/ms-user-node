import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LoggerMiddleware {
  async use(req, res, next) {
    
    next();
  }
}
