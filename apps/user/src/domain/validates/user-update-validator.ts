import * as Joi from 'joi';

export class UserUpdateValidator {
  static schema() {
    const validators = {
      id: Joi.string().required(),
      name: Joi.string().required(),
      phone: Joi.string()
        .custom((value, helper) => {
          const phone = value.replace(/[,!]/g, '');
          const regex = /[1-9]{2}[9]{1}[1-9]{1}[0-9]{7}/g;
          if (!regex.test(phone)) {
            return helper.error('any.invalid');
          }
          return true;
        })
        .label('Telefone')
        .required(),
      email: Joi.string().email().required(),
    };
    return Joi.object(validators);
  }
}
