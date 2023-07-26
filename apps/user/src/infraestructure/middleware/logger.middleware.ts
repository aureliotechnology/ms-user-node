import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LoggerMiddleware {
  async use(req, res, next) {
    // console.log(req.socket._events)
    const log = {
      headers: req.socket.rawHeaders,
      url: req.socket.url,
      method: req.socket.method,
      client: req.socket.client,
      res: res.res,
      data: new Date()
    }
    console.log(log);

  //   await axios.post('http://localhost:3002/logger/error-server', {
  //     message: 'TESTE',
  //     stack: 'TESTE',
  //     context: 'TESTE'
  // })

    next();
  }
}
