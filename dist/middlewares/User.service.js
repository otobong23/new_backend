"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const UserModel_1 = __importDefault(require("../models/userModel/UserModel"));
const Errors_1 = require("../Errors/Errors");
const utilities_constant_1 = require("../constant/utilities.constant");
dotenv_1.default.config();
class UserService {
    userModel;
    TRANSACTION_TYPES = ['deposit', 'withdraw'];
    TRANSACTION_STATUSES = ['pending', 'completed', 'failed'];
    // protected readonly BLOCKCHAIN_NETWORKS: string[] = ['BTC', 'ETH', 'SOL', 'BNB', 'LTC', 'XRP', 'XLM', 'TRC', 'DOGE', 'POLYGON', 'LUNC', 'USDT', 'USDC', 'SHIBA', 'PEPE', 'TROLL']
    static SYMBOL_TO_ID = utilities_constant_1.BLOCKCHAIN_NETWORKS_SYMBOLS;
    constructor() {
        this.userModel = UserModel_1.default;
    }
    async getUserByEmail(email) {
        const existingUser = await this.userModel.findOne({ email });
        if (!existingUser)
            throw new Errors_1.NotFoundError('User does not exist');
        return existingUser;
    }
}
exports.UserService = UserService;
// const UserService = new UserServiceFunctions()
// export default UserService
