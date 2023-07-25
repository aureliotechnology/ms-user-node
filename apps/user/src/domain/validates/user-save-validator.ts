import * as Joi from 'joi';

export class UserSaveValidator {
  static schema() {
    const validators = {
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
      pass: Joi.string().min(3).max(15).required(),
      pass_confirmation: Joi.any()
        .valid(Joi.ref('pass'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} Não combina' } }),
    };
    return Joi.object(validators);
  }
}
