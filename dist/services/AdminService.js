"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServiceFunctions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const Errors_1 = require("../Errors/Errors");
const defaultMailer_1 = require("../mailers/defaultMailer");
const JWT_service_1 = __importDefault(require("../middlewares/JWT.service"));
const User_service_1 = require("../middlewares/User.service");
const AdminModel_1 = __importDefault(require("../models/adminModel/AdminModel"));
const TransactionModel_1 = __importDefault(require("../models/transactionModel/TransactionModel"));
dotenv_1.default.config();
class AdminServiceFunctions extends User_service_1.UserService {
    transactionModel;
    adminModel;
    jwtService;
    constructor() {
        super();
        this.transactionModel = TransactionModel_1.default;
        this.adminModel = AdminModel_1.default;
        this.jwtService = JWT_service_1.default;
    }
    async login(email, password) {
        const USERNAME = process.env.EMAIL_USER;
        let existingAdmin = await this.adminModel.findOne();
        if (!existingAdmin) {
            if (USERNAME === email) {
                existingAdmin = new this.adminModel({ email });
                await existingAdmin.save();
            }
            else {
                throw new Errors_1.ConflictError('Invalid credentials');
            }
        }
        if (existingAdmin?.password !== password.trim() && existingAdmin.email !== email.trim()) {
            throw new Errors_1.ConflictError('Invalid credentials');
        }
        const token = this.jwtService.generateToken({
            adminId: existingAdmin?._id,
            email: existingAdmin?.email
        });
        return { success: true, access_token: token, message: 'login successful' };
    }
    async updateAdmin(newData) {
        const existingAdmin = await this.adminModel.findOneAndUpdate({}, newData, { new: true });
        if (!existingAdmin)
            throw new Errors_1.NotFoundError('Admin not found');
        return { success: true, message: 'Admin updated successfully', data: existingAdmin };
    }
    async getAdmin() {
        const existingAdmin = await this.adminModel.findOne();
        if (!existingAdmin)
            throw new Errors_1.NotFoundError('Admin not found');
        return { success: true, message: 'Admin fetched successfully', data: existingAdmin };
    }
    async getTotalUsers() {
        const totalUsers = await this.userModel.countDocuments();
        return { success: true, message: 'Total Users fetched successfully', data: totalUsers };
    }
    async getAllUsers(page = 1, limit = 50) {
        limit = Math.max(1, Math.min(limit, 100));
        page = Math.max(1, page);
        const offset = (page - 1) * limit;
        const [users, total] = await Promise.all([
            this.userModel.find().sort({ date: -1 }).limit(limit).skip(offset).exec(),
            this.userModel.countDocuments()
        ]);
        if (!total)
            throw new Errors_1.NotFoundError('No users found');
        const totalPages = total === 0 ? 1 : Math.ceil(total / limit);
        return {
            success: true, message: 'All Users gotten successfully', data: {
                users,
                page,
                limit,
                total,
                totalPages,
            }
        };
    }
    async getUser(email) {
        const existingUser = await this.getUserByEmail(email);
        return { success: true, message: 'User gotten successfully', data: { ...existingUser.toObject(), password: undefined, __v: undefined, _id: undefined } };
    }
    async getAllTransactions(page = 1, limit = 50) {
        limit = Math.max(1, Math.min(limit, 100));
        page = Math.max(1, page);
        const offset = (page - 1) * limit;
        const [transactions, total] = await Promise.all([
            this.transactionModel.find({ type: { $in: this.TRANSACTION_TYPES } }).sort({ date: -1 }).limit(limit).skip(offset).exec(),
            this.transactionModel.countDocuments({ type: { $in: this.TRANSACTION_TYPES } })
        ]);
        const totalPages = total === 0 ? 1 : Math.ceil(total / limit);
        return {
            success: true, message: 'Transactions fetched successfully', data: {
                transactions,
                total,
                currentPage: page,
                totalPages,
                limit
            }
        };
    }
    async getUserTransactions(email, page = 1, limit = 50) {
        const existingUser = await this.getUserByEmail(email);
        limit = Math.max(1, Math.min(limit, 100));
        page = Math.max(1, page);
        const offset = (page - 1) * limit;
        const [transactions, total] = await Promise.all([
            this.transactionModel.find({ email: existingUser.email, type: { $in: this.TRANSACTION_TYPES } }).sort({ date: -1 }).limit(limit).skip(offset).exec(),
            this.transactionModel.countDocuments({ email: existingUser.email, type: { $in: this.TRANSACTION_TYPES } })
        ]);
        const totalPages = total === 0 ? 1 : Math.ceil(total / limit);
        return {
            success: true, message: 'Transactions fetched successfully', data: {
                transactions,
                total,
                currentPage: page,
                totalPages,
                limit
            }
        };
    }
    async updateUser(email, updateData) {
        const existingUser = await this.userModel.findOneAndUpdate({ email }, updateData, { new: true });
        if (!existingUser)
            throw new Errors_1.NotFoundError('User does not exists!');
        return { message: "user's information updated successfully", success: true, data: { ...existingUser.toObject(), ...updateData, password: undefined, __v: undefined, _id: undefined } };
    }
    async deleteUser(email) {
        const existingUser = await this.userModel.findOneAndDelete({ email });
        if (!existingUser)
            throw new Errors_1.NotFoundError('User does not exists!');
        return { success: true, message: "user deleted successfully", data: { ...existingUser.toObject(), password: undefined, __v: undefined, _id: undefined } };
    }
    async updateTransaction(id, status, reason = '') {
        const existingTransaction = await this.transactionModel.findByIdAndUpdate(id, { status }, { new: true });
        if (!existingTransaction)
            throw new Errors_1.NotFoundError('Transaction not found');
        const existingUser = await this.getUserByEmail(existingTransaction.email);
        if (existingTransaction.image)
            existingTransaction.image = undefined;
        if (existingTransaction.status === 'failed') {
            if (existingTransaction.type === 'withdrawal')
                existingUser.wallet.balances[existingTransaction.blockchain] += existingTransaction.amount;
        }
        if (existingTransaction.status === 'completed') {
            if (existingTransaction.type === 'deposit')
                existingUser.wallet.balances[existingTransaction.blockchain] += existingTransaction.amount;
        }
        await existingUser.save();
        try {
            await (0, defaultMailer_1.sendTransactionStatus)(existingUser.email, existingTransaction._id.toString(), existingTransaction.amount, existingTransaction.type, existingTransaction.blockchain, existingTransaction.updatedAt.toLocaleDateString(), existingTransaction.status === 'completed' ? 'approved' : 'declined', reason);
        }
        catch (error) {
            console.log('Error sending transaction status email:', error);
        }
        return { success: true, message: "Transaction updated successfully", data: { ...existingTransaction.toObject(), user: { ...existingUser.toObject(), password: undefined, __v: undefined, _id: undefined } } };
    }
    async deleteTransaction(id) {
        const existingTransaction = await this.transactionModel.findByIdAndDelete(id);
        if (!existingTransaction)
            throw new Errors_1.NotFoundError('Transaction not found');
        return { success: true, message: "Transaction deleted successfully", data: existingTransaction.toObject() };
    }
    async searchUsers(query) {
        const users = await this.userModel.search(query);
        return { success: true, message: 'users fetched successfully', data: users };
    }
}
exports.AdminServiceFunctions = AdminServiceFunctions;
const AdminService = new AdminServiceFunctions();
exports.default = AdminService;
