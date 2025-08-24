"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CryptoBalanceSchema = new mongoose_1.default.Schema({
    BTC: { type: Number, default: 0 },
    ETH: { type: Number, default: 0 },
    SOL: { type: Number, default: 0 },
    BNB: { type: Number, default: 0 },
    XRP: { type: Number, default: 0 },
    LTC: { type: Number, default: 0 },
    XLM: { type: Number, default: 0 },
    TRC: { type: Number, default: 0 },
    DOGE: { type: Number, default: 0 },
    POLYGON: { type: Number, default: 0 },
    LUNC: { type: Number, default: 0 },
    USDT: { type: Number, default: 0 },
    USDC: { type: Number, default: 0 },
    SHIBA: { type: Number, default: 0 },
    PEPE: { type: Number, default: 0 },
    TROLL: { type: Number, default: 0 },
});
const WalletSchema = new mongoose_1.default.Schema({
    balances: { type: CryptoBalanceSchema, default: () => ({}) }
});
const UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: [true, 'first name is required!'] },
    lastName: { type: String, required: [true, 'last name is required!'] },
    email: { type: String, required: [true, 'email field is required!'], lowercase: true, unique: true },
    password: { type: String, required: [true, 'password is required!'], select: true, trim: true },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false },
    verificationTokenValidation: { type: String, select: false },
    forgotPasswordCode: { type: String, select: false },
    forgotPasswordCodeValidation: { type: String, select: false },
    passwordChangedAt: { type: Date, select: false },
    wallet: { type: WalletSchema, default: () => ({}) },
    activation: { type: Boolean, default: false }
}, {
    timestamps: true
});
UserSchema.statics.search = function (keyword) {
    const regex = new RegExp(keyword, 'i'); // case-insensitive
    return this.find({
        $or: [
            { email: regex },
            { firstName: regex },
            { lastName: regex },
        ]
    });
};
const UserModel = mongoose_1.default.model('user', UserSchema);
exports.default = UserModel;
