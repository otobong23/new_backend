import { changePassword, isVerified, login, sendForgotPasswordCode, sendVerificationEmail, signup, verifyCode, verifyForgotPasswordCode } from "../controllers/AuthController";
import { asyncResponseHandler, ValidatorErrorChecker } from "../Errors/ErrorHandler";
import { Request, Response, Router } from "express";
import { identifer } from "../middlewares/identification";
import { acceptCodeValidator, changePasswordValidator, forgotPasswordCodeValidator, emailValidator, loginValidator, signupValidator } from "validators/AuthValidator";

const AuthRouter = Router()

// Authentication Routes
AuthRouter.post('/signup', ValidatorErrorChecker(signupValidator), asyncResponseHandler(signup))
AuthRouter.post('/login', ValidatorErrorChecker(loginValidator), asyncResponseHandler(login))

// User Verification Routes
AuthRouter.get('/is-verified', identifer, asyncResponseHandler(isVerified))
AuthRouter.get('/send-verification-email', identifer, asyncResponseHandler(sendVerificationEmail))
AuthRouter.patch('/verify-code', identifer, ValidatorErrorChecker(acceptCodeValidator), asyncResponseHandler(verifyCode))

// Forgot Password Routes
AuthRouter.get('/send-forgot-password-code', ValidatorErrorChecker(emailValidator), asyncResponseHandler(sendForgotPasswordCode))
AuthRouter.patch('/verify-forgot-password-code', ValidatorErrorChecker(forgotPasswordCodeValidator), asyncResponseHandler(verifyForgotPasswordCode))
AuthRouter.patch('/change-password', ValidatorErrorChecker(changePasswordValidator), asyncResponseHandler(changePassword))

export default AuthRouter