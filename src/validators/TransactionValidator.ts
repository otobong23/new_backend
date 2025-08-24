import { BLOCKCHAIN_NETWORKS_SYMBOLS } from "constant/utilities.constant";
import Joi from "joi";


export const depositValidator = Joi.object({
   amount: Joi.number().positive().required(),
   image: Joi.string().uri().required(),
   description: Joi.string().min(3).max(250).required(),
   blockchain: Joi.string().valid(...Object.keys(BLOCKCHAIN_NETWORKS_SYMBOLS)).required(),
})

export const withdrawValidator = Joi.object({
   amount: Joi.number().positive().required(),
   walletAddress: Joi.string().required(),
   description: Joi.string().min(3).max(250).required(),
   blockchain: Joi.string().valid(...Object.keys(BLOCKCHAIN_NETWORKS_SYMBOLS)).required(),
})

export const paginationValidator = Joi.object({
   page: Joi.number().integer().min(1).default(1),
   limit: Joi.number().integer().min(1).default(50),
   email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).optional()
})