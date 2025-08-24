"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidator = exports.forgotPasswordCodeValidator = exports.emailValidator = exports.acceptCodeValidator = exports.loginValidator = exports.signupValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupValidator = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(20).required(),
    lastName: joi_1.default.string().min(2).max(20).required(),
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
    password: joi_1.default.string().required().min(6)
});
exports.loginValidator = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
    password: joi_1.default.string().required().min(6)
});
exports.acceptCodeValidator = joi_1.default.object({
    providedCode: joi_1.default.number().required()
});
exports.emailValidator = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
});
exports.forgotPasswordCodeValidator = joi_1.default.object({
    email: joi_1.default.string().email({ tlds: { allow: false } }).min(6).max(50).required(),
    providedCode: joi_1.default.number().required()
});
exports.changePasswordValidator = joi_1.default.object({
    newPassword: joi_1.default.string().required().min(6),
    token: joi_1.default.string().required()
});
