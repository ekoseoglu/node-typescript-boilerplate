import Joi, { ObjectSchema } from "joi";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const authSignup = Joi.object().keys({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});

const articlesCreateArticle = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required',
    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
  }),
});

export default {
  "/articles/createArticle": articlesCreateArticle,
  "/auth/signup": authSignup,
} as { [key: string]: ObjectSchema };
