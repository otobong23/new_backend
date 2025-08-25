import { BLOCKCHAIN_NETWORKS_SYMBOLS } from "constant/utilities.constant";
import Joi from "joi";


export const updateAdminValidator = Joi.object({
   email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).optional(),
   minDeposit: Joi.number().positive().optional(),
   maxDeposit: Joi.number().positive().optional(),
   minWithdrawal: Joi.number().positive().optional(),
   maxWithdrawal: Joi.number().positive().optional(),
   walletAddress: Joi.string().optional()
})

// 1. ICryptoBalance schema
// export const cryptoBalanceValidator= Joi.object({
//   BTC: Joi.number().min(0).optional(),
//   ETH: Joi.number().min(0).optional(),
//   SOL: Joi.number().min(0).optional(),
//   BNB: Joi.number().min(0).optional(),
//   XRP: Joi.number().min(0).optional(),
//   LTC: Joi.number().min(0).optional(),
//   XLM: Joi.number().min(0).optional(),
//   TRC: Joi.number().min(0).optional(),
//   DOGE: Joi.number().min(0).optional(),
//   POLYGON: Joi.number().min(0).optional(),
//   LUNC: Joi.number().min(0).optional(),
//   USDT: Joi.number().min(0).optional(),
//   USDC: Joi.number().min(0).optional(),
//   SHIBA: Joi.number().min(0).optional(),
//   PEPE: Joi.number().min(0).optional(),
//   TROLL: Joi.number().min(0).optional(),
// });

// 2. IWallet schema
// export const walletValidator = Joi.object({
//   balances: cryptoBalanceValidator.optional(),
// });

// 3. IUser schema
export const userValidator = Joi.object({
  firstName: Joi.string().trim().optional(),
  lastName: Joi.string().trim().optional(),
  email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).optional(),
  password: Joi.string().min(6).optional(),
  verified: Joi.boolean().default(false),
  activation: Joi.boolean().default(true),
});

export const updateUserBlockchainBalanceValidator = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
  blockchain: Joi.string().valid(...Object.keys(BLOCKCHAIN_NETWORKS_SYMBOLS)).required(),
  amount: Joi.number().positive().required()
});

// export const userUpdateSchema = userSchema.fork(Object.keys(userSchema.describe().keys), (field) => field.optional());

export const updateTransactionValidator = Joi.object({
   id: Joi.string().hex().required(),
   status: Joi.string().valid('pending', 'completed', 'failed').required(),
   reason: Joi.string().max(250).optional()
})

export const idValidator = Joi.object({
   id: Joi.string().hex().required()
})