const Joi = require('joi');

export const validationNameSchema = Joi.object().keys({
    name:
        Joi
        .string()
        .regex(/^[аa-яzАA-ЯZ0-9]{3,30}$/)
        .required()
});

export const validationSurnameSchema = Joi.object().keys({
    surname:
        Joi
        .string()
        .regex(/^[аa-яzАA-ЯZ0-9]{3,30}$/)
        .required()
});

export const validationEmailSchema = Joi.object().keys({
    email:
        Joi
        .string()
        .email({minDomainAtoms: 2})
        .required()
});

export const validationDateSchema = Joi.object().keys({
   birthDay:
       Joi
       .date()
       .min(new Date(1900, 0, 1))
       // .max(new Date().setFullYear(new Date().getFullYear() - 3))
       .required()
});

export const validationPhoneSchema = Joi.object().keys({
    phone:
        Joi
        .string()
        .min(19)
        .required()
});

export const validationStreetSchema = Joi.object().keys({
    street:
        Joi
        .string()
        .max(25)
        .required()
});

export const validationHomeSchema = Joi.object().keys({
    home:
        Joi
        .string()
        .max(8)
        .required()
});

export const validationPostIndexSchema = Joi.object().keys({
    postIndex:
        Joi
        .number()
        .min(10000)
        .max(99999)
        .required()
});


export const validationPasswordSchema = Joi.object().keys({
   password:
       Joi
       .string()
       .alphanum()
       .min(8)
       .required()
});
