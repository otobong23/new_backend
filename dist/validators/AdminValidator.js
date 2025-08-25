"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidator = exports.updateTransactionValidator = exports.updateUserBlockchainBalanceValidator = exports.userValidator = exports.updateAdminValidator = void 0;
const utilities_constant_1 = require("../constant/utilities.constant");
const joi_1 = __importDefault(require("joi"));
exports.updateAdminValidator = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).optional(),
    minDeposit: joi_1.default.number().positive().optional(),
    maxDeposit: joi_1.default.number().positive().optional(),
    minWithdrawal: joi_1.default.number().positive().optional(),
    maxWithdrawal: joi_1.default.number().positive().optional(),
    walletAddress: joi_1.default.string().optional()
});
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
exports.userValidator = joi_1.default.object({
    firstName: joi_1.default.string().trim().optional(),
    lastName: joi_1.default.string().trim().optional(),
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).optional(),
    password: joi_1.default.string().min(6).optional(),
    verified: joi_1.default.boolean().default(false),
    activation: joi_1.default.boolean().default(true),
});
exports.updateUserBlockchainBalanceValidator = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
    blockchain: joi_1.default.string().valid(...Object.keys(utilities_constant_1.BLOCKCHAIN_NETWORKS_SYMBOLS)).required(),
    amount: joi_1.default.number().positive().required()
});
// export const userUpdateSchema = userSchema.fork(Object.keys(userSchema.describe().keys), (field) => field.optional());
exports.updateTransactionValidator = joi_1.default.object({
    id: joi_1.default.string().hex().required(),
    status: joi_1.default.string().valid('pending', 'completed', 'failed').required(),
    reason: joi_1.default.string().max(250).optional()
});
exports.idValidator = joi_1.default.object({
    id: joi_1.default.string().hex().required()
});
