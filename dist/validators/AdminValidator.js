"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidator = exports.updateTransactionValidator = exports.userValidator = exports.walletValidator = exports.cryptoBalanceValidator = exports.updateAdminValidator = void 0;
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
exports.cryptoBalanceValidator = joi_1.default.object({
    BTC: joi_1.default.number().min(0).optional(),
    ETH: joi_1.default.number().min(0).optional(),
    SOL: joi_1.default.number().min(0).optional(),
    BNB: joi_1.default.number().min(0).optional(),
    XRP: joi_1.default.number().min(0).optional(),
    LTC: joi_1.default.number().min(0).optional(),
    XLM: joi_1.default.number().min(0).optional(),
    TRC: joi_1.default.number().min(0).optional(),
    DOGE: joi_1.default.number().min(0).optional(),
    POLYGON: joi_1.default.number().min(0).optional(),
    LUNC: joi_1.default.number().min(0).optional(),
    USDT: joi_1.default.number().min(0).optional(),
    USDC: joi_1.default.number().min(0).optional(),
    SHIBA: joi_1.default.number().min(0).optional(),
    PEPE: joi_1.default.number().min(0).optional(),
    TROLL: joi_1.default.number().min(0).optional(),
});
// 2. IWallet schema
exports.walletValidator = joi_1.default.object({
    balances: exports.cryptoBalanceValidator.optional(),
});
// 3. IUser schema
exports.userValidator = joi_1.default.object({
    firstName: joi_1.default.string().trim().optional(),
    lastName: joi_1.default.string().trim().optional(),
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
    password: joi_1.default.string().min(6).optional(),
    verified: joi_1.default.boolean().default(false),
    wallet: exports.walletValidator.optional(),
    activation: joi_1.default.boolean().default(true),
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
