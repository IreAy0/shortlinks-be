const Joi = require('joi');
const { password } = require('./custom.validation');

const createUrl = {
  body: Joi.object().keys({
    originalUrl: Joi.string().uri().required().messages({
      'string.uri': 'originalUrl must be a valid URI',
      'any.required': 'originalUrl is required',
    }),
    baseUrl: Joi.string().uri().required().messages({
      'string.uri': 'Base Url must be a valid URI',
      'any.required': 'Base Url is required',
    }),
    alias: Joi.string().alphanum().min(3).max(30).optional().messages({
      'string.alphanum': 'alias must only contain alpha-numeric characters',
      'string.min': 'alias must be at least 3 characters',
      'string.max': 'alias must be at most 30 characters',
    }),
    expiration: Joi.date().iso().optional().messages({
      'date.format': 'expiration must be a valid ISO date',
    }),
    password: Joi.string().custom(password).optional().messages({
      'string.base': 'password must be a string',
    }),
    title: Joi.string().optional().messages({
      'string.base': 'title must be a string',
    }),
  }),
};

const passwordValidation = {
  body: Joi.object().keys({
    password: Joi.string().required().messages({
      'string.base': 'password must be a string',
      'any.required': 'password is required',
    }),
  }),
};

module.exports = {
  createUrl,
  passwordValidation,
};
