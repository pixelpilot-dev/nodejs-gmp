import Joi from 'joi';
import { MIN_AGE, MAX_AGE, MIN_LENGTH, MIN_LIMIT } from '../constants.js';

export const userSchema = {
  userId: Joi.object({
    id: Joi.string().guid(),
  }),
  user: Joi.object({
    age: Joi.number().integer().min(MIN_AGE).max(MAX_AGE).required(),
    login: Joi.string().alphanum().min(MIN_LENGTH).required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
      .required(),
  }),
  autoSuggest: Joi.object({
    login: Joi.required(),
    limit: Joi.number().integer().min(MIN_LIMIT),
  }),
};
