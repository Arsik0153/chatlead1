import {
    validationNameSchema,
    validationSurnameSchema,
    validationDateSchema,
    validationEmailSchema,
    validationPhoneSchema,
    validationHomeSchema,
    validationPasswordSchema,
    validationPostIndexSchema,
    validationStreetSchema
} from "./Schemas/SignUpValidationSchemas";
const Joi = require('joi');


const validationRegister = values => {
    const errors = {};
    const {
        name,
        surname,
        birthDay,
        email,
        phone,
        home,
        postIndex,
        street,
        password,
        confirmPassword
    } = values;



    Joi.validate({
        name: name
    }, validationNameSchema, (err) => {
        err && (
          errors.name
              = "Имя должно содержать не менее 3х латинских или кириллических символов"
        );
    });

    Joi.validate({
        surname: surname
    }, validationSurnameSchema, (err) => {
        err && (
            errors.surname
                = "Имя должна содержать не менее 3х латинских или кириллических символов"
        );
    });

    Joi.validate({
        email: email
    }, validationEmailSchema, (err) => {
        err && (
            errors.email
                = "Вы ввели некоректную почту"
        );
    });

    Joi.validate({
        birthDay: birthDay
    }, validationDateSchema, (err) => {
        err && (
            errors.birthDay
                = "Вы ввели некоректную дату своего рождения!"
        );
    });

    Joi.validate({
        phone: phone
    }, validationPhoneSchema, (err) => {
        err && (
            errors.phone
                = "Вы ввели некоректный номер телефона!"
        );
    });

    Joi.validate({
        street: street
    }, validationStreetSchema, (err) => {
        err && (
            errors.street
                = "Вы ввели некоректное название улицы"
        );
    });

    Joi.validate({
        home: home
    }, validationHomeSchema, (err) => {
        err && (
            errors.home
                = "Вы ввели некоректный номер дома"
        );
    });

    Joi.validate({
        postIndex: postIndex
    }, validationPostIndexSchema, (err) => {
        err && (
            errors.postIndex
                = "Вы ввели некоректный индекс. Он должен быть 5ти значный, и, состоять из цифр"
        );
    });


    Joi.validate({
        password: password
    }, validationPasswordSchema, (err) => {
        err && (
            errors.password
                = "Придумайте более сложный пароль(не менее 8 символов)"
        );
    });

    if(password != confirmPassword) {
        errors.confirmPassword = "Пароли не совпадают"
    }


    return errors;
};


export default validationRegister