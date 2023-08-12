const Joi = require('joi');

exports.create = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string()
    .equal(Joi.ref('password'))
    .required()
    .label('confirmPassword')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
  gender: Joi.string().valid('Female', 'Male').required(),
  role: Joi.string().required(),
});

exports.update = Joi.object({
  email: Joi.string().email().required(),
  gender: Joi.string().valid('Female', 'Male').required(),
  role: Joi.string().required(),
});
