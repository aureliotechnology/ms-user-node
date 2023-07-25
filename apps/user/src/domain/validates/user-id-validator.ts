import * as Joi from 'joi';

export class UserIdValidator {
  static schema() {
    const exp =
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    const idRegex = new RegExp(exp);
    const validators = {
      id: Joi.string().regex(idRegex).required(),
    };

    return Joi.object(validators);
  }
}
