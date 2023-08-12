const Joi = require('joi');

exports.create = Joi.object({
  title: Joi.string().required(),
  genres: Joi.string().required(),
  year: Joi.string().required()
});

exports.update = Joi.object({
  title: Joi.string().required(),
  genres: Joi.string().required(),
  year: Joi.string().required(),
});
