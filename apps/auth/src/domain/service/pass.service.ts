import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';

@Injectable()
export class PassService {

    public static encrypt(plaintext)  {
        let salt = 32
        const secret = salt.toString();
        return crypto.createHmac('sha256', secret)
                   .update(plaintext)
                   .digest('hex');
      }

}