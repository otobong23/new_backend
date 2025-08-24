import Joi from "joi";

export const signupValidator = Joi.object({
   firstName: Joi.string().min(2).max(20).required(),
   lastName: Joi.string().min(2).max(20).required(),
   email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
   password: Joi.string().required().min(6)
})

export const loginValidator = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
  password: Joi.string().required().min(6)
})

export const acceptCodeValidator = Joi.object({
  providedCode: Joi.number().required()
})

export const emailValidator = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
})

export const forgotPasswordCodeValidator = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
  providedCode: Joi.number().required()
})

export const changePasswordValidator = Joi.object({
  newPassword: Joi.string().required().min(6),
  token: Joi.string().required()
})