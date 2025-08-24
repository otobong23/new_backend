import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { acceptCodeValidator, changePasswordValidator, forgotPasswordCodeValidator, emailValidator, loginValidator, signupValidator } from "../validators/AuthValidator";

// User Authentication Route Functionalities
export const signup = async (req: Request, res: Response) => {
   const {value} = signupValidator.validate(req.body)
   const {firstName, lastName, email, password} = value
   const response = await AuthService.signup(email, password, firstName, lastName)
   res.status(200).json(response)
}
export const login = async (req: Request, res: Response) => {
   const {value} = loginValidator.validate(req.body)
   const { email, password } = value
   const response = await AuthService.login(email, password)
   res.status(201).json(response)
}

// User Verification Route Functionalities
export const isVerified = async (req: Request, res: Response) => {
   const user = req.user;
   const response = await AuthService.isVerified(user.email);
   res.status(201).json(response)
}
export const sendVerificationEmail = async (req: Request, res: Response) => {
   const user = req.user;
   const response = await AuthService.sendVerificationEmail(user.email)
   res.status(201).json(response)
}
export const verifyCode = async (req: Request, res: Response) => {
   const user = req.user;
   const { value: { providedCode } } = acceptCodeValidator.validate(req.body);
   const response = await AuthService.verifyCode(user.email, providedCode)
   res.status(201).json(response)
}

// Forgot Password Route Fuctionalities
export const sendForgotPasswordCode = async (req: Request, res: Response) => {
   const { value: { email } } = emailValidator.validate(req.body);
   const response = await AuthService.sendForgotPasswordCode(email)
   res.status(201).json(response)
}
export const verifyForgotPasswordCode = async (req: Request, res: Response) => {
   const { value: { email, providedCode } } = forgotPasswordCodeValidator.validate(req.body);
   const response = await AuthService.verifyForgotPasswordCode(email, providedCode)
   res.status(201).json(response)
}
export const changePassword = async (req: Request, res: Response) => {
   const { value: { newPassword, token } } = changePasswordValidator.validate(req.body);
   const response = await AuthService.resetPassword(newPassword, token)
   res.status(201).json(response)
}