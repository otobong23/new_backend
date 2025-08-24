"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    email: { type: String, require: [true, 'email field is required!'], lowercase: true, unique: true },
    password: { type: String, require: [true, 'password is required!'], select: false, trim: true, default: 'admin123' },
    minDeposit: { type: Number, default: 10 },
    maxDeposit: { type: Number, default: 10 },
    minWithdrawal: { type: Number, default: 10 },
    maxWithdrawal: { type: Number, default: 10 },
    walletAddress: { type: String, required: true, default: '1NDHZtXsy1QPRt4sro23agUcFX1vqaWSGG' }
}, {
    timestamps: true,
});
const AdminModel = mongoose_1.default.model('admin', AdminSchema);
exports.default = AdminModel;
const getAdmin = () => AdminModel.findOne();
exports.getAdmin = getAdmin;
