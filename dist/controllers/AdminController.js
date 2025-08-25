"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.deleteTransaction = exports.updateTransaction = exports.deleteUser = exports.updateUserBlockchainBalance = exports.updateUser = exports.getUserTransactions = exports.getAllTransactions = exports.getUser = exports.getAllUsers = exports.getTotalUsers = exports.getAdmin = exports.updateAdmin = exports.adminLogin = void 0;
const AdminService_1 = __importDefault(require("../services/AdminService"));
const AdminValidator_1 = require("../validators/AdminValidator");
const AuthValidator_1 = require("../validators/AuthValidator");
const TransactionValidator_1 = require("../validators/TransactionValidator");
const adminLogin = async (req, res) => {
    const { value: { email, password } } = AuthValidator_1.loginValidator.validate(req.body);
    const response = await AdminService_1.default.login(email, password);
    res.status(200).json(response);
};
exports.adminLogin = adminLogin;
const updateAdmin = async (req, res) => {
    const { value: newData } = AdminValidator_1.updateAdminValidator.validate(req.body);
    const response = await AdminService_1.default.updateAdmin(newData);
    res.status(200).json(response);
};
exports.updateAdmin = updateAdmin;
const getAdmin = async (req, res) => {
    const response = await AdminService_1.default.getAdmin();
    res.status(201).json(response);
};
exports.getAdmin = getAdmin;
const getTotalUsers = async (req, res) => {
    const response = await AdminService_1.default.getTotalUsers();
    res.status(201).json(response);
};
exports.getTotalUsers = getTotalUsers;
const getAllUsers = async (req, res) => {
    const { value: { page, limit } } = TransactionValidator_1.paginationValidator.validate(req.query);
    const response = await AdminService_1.default.getAllUsers(page, limit);
    res.status(201).json(response);
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res) => {
    const { value: { email } } = AuthValidator_1.emailValidator.validate(req.query);
    const response = await AdminService_1.default.getUser(email);
    res.status(201).json(response);
};
exports.getUser = getUser;
const getAllTransactions = async (req, res) => {
    const { value: { page, limit } } = TransactionValidator_1.paginationValidator.validate(req.query);
    const response = await AdminService_1.default.getAllTransactions(page, limit);
    res.status(201).json(response);
};
exports.getAllTransactions = getAllTransactions;
const getUserTransactions = async (req, res) => {
    const { value: { page, limit, email } } = TransactionValidator_1.paginationValidator.validate(req.query);
    const response = await AdminService_1.default.getUserTransactions(email, page, limit);
    res.status(201).json(response);
};
exports.getUserTransactions = getUserTransactions;
const updateUser = async (req, res) => {
    const { email } = req.query;
    const { value: newData } = AdminValidator_1.userValidator.validate(req.body);
    const response = await AdminService_1.default.updateUser(email, newData);
    res.status(200).json(response);
};
exports.updateUser = updateUser;
const updateUserBlockchainBalance = async (req, res) => {
    const { value: { email, blockchain, amount } } = AdminValidator_1.updateUserBlockchainBalanceValidator.validate(req.body);
    const response = await AdminService_1.default.updateUserBlockchainBalance(email, blockchain, amount);
    res.status(200).json(response);
};
exports.updateUserBlockchainBalance = updateUserBlockchainBalance;
const deleteUser = async (req, res) => {
    const { value: { email } } = AuthValidator_1.emailValidator.validate(req.query);
    const response = await AdminService_1.default.deleteUser(email);
    res.status(200).json(response);
};
exports.deleteUser = deleteUser;
const updateTransaction = async (req, res) => {
    const { value: { id, status, reason } } = AdminValidator_1.updateTransactionValidator.validate(req.body);
    const response = await AdminService_1.default.updateTransaction(id, status, reason);
    res.status(200).json(response);
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (req, res) => {
    const { value: { id } } = AdminValidator_1.idValidator.validate(req.query);
    const response = await AdminService_1.default.deleteTransaction(id);
    res.status(200).json(response);
};
exports.deleteTransaction = deleteTransaction;
const searchUsers = async (req, res) => {
    const query = req.query.filter;
    const response = await AdminService_1.default.searchUsers(query);
    res.status(200).json(response);
};
exports.searchUsers = searchUsers;
