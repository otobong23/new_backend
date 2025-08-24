"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionServiceFunctions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const TransactionModel_1 = __importDefault(require("../models/transactionModel/TransactionModel"));
const Errors_1 = require("../Errors/Errors");
const User_service_1 = require("../middlewares/User.service");
const axios_1 = __importDefault(require("axios"));
const defaultMailer_1 = require("../mailers/defaultMailer");
dotenv_1.default.config();
class TransactionServiceFunctions extends User_service_1.UserService {
    transactionModel;
    constructor() {
        super();
        this.transactionModel = TransactionModel_1.default;
    }
    async deposit(email, amount, image, description = '', blockchain) {
        const existingUser = await this.getUserByEmail(email);
        const SUPPORTED_BLOCKCHAIN_NETWORKS = Object.keys(TransactionServiceFunctions.SYMBOL_TO_ID);
        if (!SUPPORTED_BLOCKCHAIN_NETWORKS.includes(blockchain))
            throw new Errors_1.BadRequestError('Unsupported Blockchain Network');
        const newTransaction = new this.transactionModel({
            userId: existingUser._id,
            email: existingUser.email,
            amount,
            image,
            description: description ?? 'Account Deposit',
            type: this.TRANSACTION_TYPES[0],
            status: this.TRANSACTION_STATUSES[0]
        });
        await newTransaction.save();
        try {
            await (0, defaultMailer_1.sendTransactionMail)(existingUser.email, amount, newTransaction._id.toString(), this.TRANSACTION_TYPES[0], blockchain, newTransaction.createdAt.toString());
        }
        catch (error) {
            console.log("Failed to send deposit email:", error);
        }
        return { success: true, message: 'Deposit request submitted successfully', data: newTransaction };
    }
    async withdraw(email, amount, description = '', blockchain, walletAddress) {
        const existingUser = await this.getUserByEmail(email);
        const SUPPORTED_BLOCKCHAIN_NETWORKS = Object.keys(TransactionServiceFunctions.SYMBOL_TO_ID);
        if (!SUPPORTED_BLOCKCHAIN_NETWORKS.includes(blockchain))
            throw new Errors_1.BadRequestError('Unsupported Blockchain Network');
        if (existingUser.wallet.balances[blockchain] && existingUser.wallet.balances[blockchain] >= amount)
            existingUser.wallet.balances[blockchain] -= amount;
        else
            throw new Errors_1.NotFoundError(`You do not have ${blockchain} in your wallet`);
        const newTransaction = new this.transactionModel({
            userId: existingUser._id,
            email: existingUser.email,
            amount,
            walletAddress,
            description: description ?? 'Account Withdrawal',
            type: this.TRANSACTION_TYPES[1],
            status: this.TRANSACTION_STATUSES[0]
        });
        await newTransaction.save();
        await existingUser.save();
        try {
            await (0, defaultMailer_1.sendTransactionMail)(existingUser.email, amount, newTransaction._id.toString(), this.TRANSACTION_TYPES[1], blockchain, newTransaction.createdAt.toString());
        }
        catch (error) {
            console.log("Failed to send withdrawal email:", error);
        }
        return { success: true, message: 'Withdrawal request submitted successfully', data: newTransaction };
    }
    async getUserTransactions(email, page = 1, limit = 50) {
        const existingUser = await this.getUserByEmail(email);
        limit = Math.max(1, Math.min(limit, 100));
        page = Math.max(1, page);
        const offset = (page - 1) * limit;
        const [transactions, total] = await Promise.all([
            this.transactionModel.find({ userId: existingUser._id }).sort({ date: -1 }).limit(limit).skip(offset).exec(),
            this.transactionModel.countDocuments({ userId: existingUser._id })
        ]);
        const totalPages = total === 0 ? 1 : Math.ceil(total / limit);
        return {
            success: true, message: 'Transactions fetched successfully', data: {
                transactions,
                total,
                currentPage: page,
                totalPages,
                limit,
                user: {
                    email: existingUser.email,
                    balances: existingUser.wallet.balances
                }
            }
        };
    }
    async getCryptoToUSD_Rate() {
        try {
            const ids = Object.values(TransactionServiceFunctions.SYMBOL_TO_ID).join(",");
            const response = await axios_1.default.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
            return { success: true, message: 'Crypto to USD rate fetched successfully', data: response.data };
        }
        catch (error) {
            throw new Errors_1.InternalServerError('Failed to fetch crypto to USD rate');
        }
    }
}
exports.TransactionServiceFunctions = TransactionServiceFunctions;
const TransactionService = new TransactionServiceFunctions();
exports.default = TransactionService;
