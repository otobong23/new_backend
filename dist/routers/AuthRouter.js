"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../controllers/AuthController");
const ErrorHandler_1 = require("../Errors/ErrorHandler");
const express_1 = require("express");
const identification_1 = require("../middlewares/identification");
const AuthValidator_1 = require("../validators/AuthValidator");
const AuthRouter = (0, express_1.Router)();
// Authentication Routes
AuthRouter.post('/signup', (0, ErrorHandler_1.ValidatorErrorChecker)(AuthValidator_1.signupValidator), (0, ErrorHandler_1.asyncResponseHandler)(AuthController_1.signup));
AuthRouter.post('/login', (0, ErrorHandler_1.ValidatorErrorChecker)(AuthValidator_1.loginValidator), (0, ErrorHandler_1.asyncResponseHandler)(AuthController_1.login));
// User Verification Routes
AuthRouter.get('/is-verified', identification_1.identifer, (0, ErrorHandler_1.asyncResponseHandler)(AuthController_1.isVerified));
AuthRouter.get('/send-verification-email', identification_1.identifer, (0, ErrorHandler_1.asyncResponseHandler)(AuthController_1.sendVerificationEmail));
AuthRouter.patch('/verify-code', identification_1.identifer, (0, ErrorHandler_1.ValidatorErrorChecker)(AuthValidator_1.acceptCodeValidator), (0, ErrorHandler_1.asyncResponseHandler)(AuthController_1.verifyCode));
// Forgot Password Routes
AuthRouter.get('/send-forgot-password-code', (0, ErrorHandler_1.ValidatorErrorChecker)(AuthValidator_1.emailValidator), (0, ErrorHandler_1.asyncResponseHandler)(AuthController_1.sendForgotPasswordCode));
AuthRouter.patch('/verify-forgot-password-code', (0, ErrorHandler_1.ValidatorErrorChecker)(AuthValidator_1.forgotPasswordCodeValidator), (0, ErrorHandler_1.asyncResponseHandler)(AuthController_1.verifyForgotPasswordCode));
AuthRouter.patch('/change-password', (0, ErrorHandler_1.ValidatorErrorChecker)(AuthValidator_1.changePasswordValidator), (0, ErrorHandler_1.asyncResponseHandler)(AuthController_1.changePassword));
exports.default = AuthRouter;
