"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoToUSD_Rate = exports.getUserTransactions = exports.withdraw = exports.deposit = void 0;
const TransactionService_1 = __importDefault(require("../services/TransactionService"));
const TransactionValidator_1 = require("../validators/TransactionValidator");
const deposit = async (req, res) => {
    const { user } = req;
    const { value: { amount, image, description, blockchain } } = TransactionValidator_1.depositValidator.validate(req.body);
    const response = await TransactionService_1.default.deposit(user.email, amount, image, description, blockchain);
    res.status(200).json(response);
};
exports.deposit = deposit;
const withdraw = async (req, res) => {
    const { user } = req;
    const { value: { amount, description, blockchain, walletAddress } } = TransactionValidator_1.withdrawValidator.validate(req.body);
    const response = await TransactionService_1.default.withdraw(user.email, amount, description, blockchain, walletAddress);
    res.status(200).json(response);
};
exports.withdraw = withdraw;
const getUserTransactions = async (req, res) => {
    const { user } = req;
    const { value: { page, limit } } = TransactionValidator_1.paginationValidator.validate(req.query);
    const response = await TransactionService_1.default.getUserTransactions(user.email, page, limit);
    res.status(200).json(response);
};
exports.getUserTransactions = getUserTransactions;
const getCryptoToUSD_Rate = async (req, res) => {
    const response = await TransactionService_1.default.getCryptoToUSD_Rate();
    res.status(200).json(response);
};
exports.getCryptoToUSD_Rate = getCryptoToUSD_Rate;
