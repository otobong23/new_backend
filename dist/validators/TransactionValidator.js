"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidator = exports.withdrawValidator = exports.depositValidator = void 0;
const utilities_constant_1 = require("../constant/utilities.constant");
const joi_1 = __importDefault(require("joi"));
exports.depositValidator = joi_1.default.object({
    amount: joi_1.default.number().positive().required(),
    image: joi_1.default.string().uri().required(),
    description: joi_1.default.string().min(3).max(250).required(),
    blockchain: joi_1.default.string().valid(Object.keys(utilities_constant_1.BLOCKCHAIN_NETWORKS_SYMBOLS)).required(),
});
exports.withdrawValidator = joi_1.default.object({
    amount: joi_1.default.number().positive().required(),
    walletAddress: joi_1.default.string().required(),
    description: joi_1.default.string().min(3).max(250).required(),
    blockchain: joi_1.default.string().valid(...Object.keys(utilities_constant_1.BLOCKCHAIN_NETWORKS_SYMBOLS)).required(),
});
exports.paginationValidator = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).default(50),
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).optional()
});
