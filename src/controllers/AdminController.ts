import { Request, Response } from "express";
import AdminService from "services/AdminService";
import { idValidator, updateAdminValidator, updateTransactionValidator, userValidator } from "validators/AdminValidator";
import { emailValidator, loginValidator } from "validators/AuthValidator";
import { paginationValidator } from "validators/TransactionValidator";


export const adminLogin = async (req: Request, res: Response) => {
   const { value: { email, password } } = loginValidator.validate(req.body);
   const response = await AdminService.login(email, password);
   res.status(200).json(response);
}

export const updateAdmin = async (req: Request, res: Response) => {
   const { value: newData } = updateAdminValidator.validate(req.body);
   const response = await AdminService.updateAdmin(newData);
   res.status(200).json(response);
}

export const getAdmin = async (req: Request, res: Response) => {
   const response = await AdminService.getAdmin();
   res.status(201).json(response);
}

export const getTotalUsers = async (req: Request, res: Response) => {
   const response = await AdminService.getTotalUsers();
   res.status(201).json(response);
}

export const getAllUsers = async (req: Request, res: Response) => {
   const { value: { page, limit } } = paginationValidator.validate(req.query);
   const response = await AdminService.getAllUsers(page, limit);
   res.status(201).json(response);
}

export const getUser = async (req: Request, res: Response) => {
   const { value: { email } } = emailValidator.validate(req.query);
   const response = await AdminService.getUser(email);
   res.status(201).json(response);
}

export const getAllTransactions = async (req: Request, res: Response) => {
   const { value: { page, limit } } = paginationValidator.validate(req.query);
   const response = await AdminService.getAllTransactions(page, limit);
   res.status(201).json(response)
}

export const getUserTransactions = async (req: Request, res: Response) => {
   const { value: { page, limit, email } } = paginationValidator.validate(req.query);
   const response = await AdminService.getUserTransactions(email, page, limit);
   res.status(201).json(response);
}

export const updateUser = async (req: Request, res: Response) => {
   const { value: { email } } = emailValidator.validate(req.query);
   const { value: newData } = userValidator.validate(req.body);
   const response = await AdminService.updateUser(email, newData);
   res.status(200).json(response);
}

export const deleteUser = async (req: Request, res: Response) => {
   const { value: { email } } = emailValidator.validate(req.query);
   const response = await AdminService.deleteUser(email);
   res.status(200).json(response)
}

export const updateTransaction = async (req: Request, res: Response) => {
   const { value: { id, status, reason } } = updateTransactionValidator.validate(req.body);
   const response = await AdminService.updateTransaction(id, status, reason);
   res.status(200).json(response)
}

export const deleteTransaction = async (req: Request, res: Response) => {
   const { value: { id } } = idValidator.validate(req.query);
   const response = await AdminService.deleteTransaction(id);
   res.status(200).json(response);
}

export const searchUsers = async (req: Request, res: Response) => {
   const query = req.query.filter as string;
   const response = await AdminService.searchUsers(query);
   res.status(200).json(response);
}