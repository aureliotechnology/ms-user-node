import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationsUtils {
  static phoneRegex = /[1-9]{2}[9]{1}[1-9]{1}[0-9]{7}/g;
  static uuidRegex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
}
