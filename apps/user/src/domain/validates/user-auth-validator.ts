import * as Joi from 'joi';

export class UserAuthValidator {
  static schema() {
    const validators = {
      email: Joi.string().email().required(),
      pass: Joi.string().min(3).max(15).required(),
    };
    return Joi.object(validators);
  }
}
