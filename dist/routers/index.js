"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const TransactionRouter_1 = __importDefault(require("./TransactionRouter"));
const AdminRouter_1 = __importDefault(require("./AdminRouter"));
const AppRouter = (0, express_1.Router)();
AppRouter.use('/auth', AuthRouter_1.default);
AppRouter.use('/transactions', TransactionRouter_1.default);
AppRouter.use('/admin', AdminRouter_1.default);
exports.default = AppRouter;
