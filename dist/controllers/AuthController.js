"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.verifyForgotPasswordCode = exports.sendForgotPasswordCode = exports.verifyCode = exports.sendVerificationEmail = exports.isVerified = exports.login = exports.signup = void 0;
const AuthService_1 = __importDefault(require("../services/AuthService"));
const AuthValidator_1 = require("../validators/AuthValidator");
// User Authentication Route Functionalities
const signup = async (req, res) => {
    const { value } = AuthValidator_1.signupValidator.validate(req.body);
    const { firstName, lastName, email, password } = value;
    const response = await AuthService_1.default.signup(email, password, firstName, lastName);
    res.status(200).json(response);
};
exports.signup = signup;
const login = async (req, res) => {
    const { value } = AuthValidator_1.loginValidator.validate(req.body);
    const { email, password } = value;
    const response = await AuthService_1.default.login(email, password);
    res.status(201).json(response);
};
exports.login = login;
// User Verification Route Functionalities
const isVerified = async (req, res) => {
    const user = req.user;
    const response = await AuthService_1.default.isVerified(user.email);
    res.status(201).json(response);
};
exports.isVerified = isVerified;
const sendVerificationEmail = async (req, res) => {
    const user = req.user;
    const response = await AuthService_1.default.sendVerificationEmail(user.email);
    res.status(201).json(response);
};
exports.sendVerificationEmail = sendVerificationEmail;
const verifyCode = async (req, res) => {
    const user = req.user;
    const { value: { providedCode } } = AuthValidator_1.acceptCodeValidator.validate(req.body);
    const response = await AuthService_1.default.verifyCode(user.email, providedCode);
    res.status(201).json(response);
};
exports.verifyCode = verifyCode;
// Forgot Password Route Fuctionalities
const sendForgotPasswordCode = async (req, res) => {
    const { value: { email } } = AuthValidator_1.emailValidator.validate(req.body);
    const response = await AuthService_1.default.sendForgotPasswordCode(email);
    res.status(201).json(response);
};
exports.sendForgotPasswordCode = sendForgotPasswordCode;
const verifyForgotPasswordCode = async (req, res) => {
    const { value: { email, providedCode } } = AuthValidator_1.forgotPasswordCodeValidator.validate(req.body);
    const response = await AuthService_1.default.verifyForgotPasswordCode(email, providedCode);
    res.status(201).json(response);
};
exports.verifyForgotPasswordCode = verifyForgotPasswordCode;
const changePassword = async (req, res) => {
    const { value: { newPassword, token } } = AuthValidator_1.changePasswordValidator.validate(req.body);
    const response = await AuthService_1.default.resetPassword(newPassword, token);
    res.status(201).json(response);
};
exports.changePassword = changePassword;
