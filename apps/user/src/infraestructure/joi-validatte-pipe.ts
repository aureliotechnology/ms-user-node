/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ObjectSchema, compile } from 'joi';
import { messages } from 'joi-translation-pt-br';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(data: any, _metadata: ArgumentMetadata) {
    const validation = compile(this.schema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(data, { messages });
    if (validation.error) {
      const errorMessage = validation.error.details
        .map((details) => details.message)
        .join(', ');
      const badMessage = 'Um ou mais campos inválidos, ' + errorMessage;
      throw new HttpException(badMessage, HttpStatus.BAD_REQUEST);
    }

    return data;
  }
}
