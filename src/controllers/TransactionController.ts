import { Request, Response } from "express";
import TransactionService from "services/TransactionService";
import { depositValidator, paginationValidator, withdrawValidator } from "validators/TransactionValidator";


export const deposit = async (req: Request, res: Response) => {
   const { user } = req;
   const { value: { amount, image, description, blockchain } } = depositValidator.validate(req.body)
   const response = await TransactionService.deposit(user.email, amount, image, description, blockchain )
   res.status(200).json(response)
}
export const withdraw = async (req: Request, res: Response) => {
   const { user } = req;
   const { value: { amount, description, blockchain, walletAddress } } = withdrawValidator.validate(req.body)
   const response = await TransactionService.withdraw(user.email, amount, description, blockchain, walletAddress)
   res.status(200).json(response)
}
export const getUserTransactions = async (req: Request, res: Response) => {
   const { user } = req;
   const { value: { page, limit } } = paginationValidator.validate(req.query)
   const response = await TransactionService.getUserTransactions(user.email, page, limit)
   res.status(200).json(response)
}
export const getCryptoToUSD_Rate = async (req: Request, res: Response) => {
   const response = await TransactionService.getCryptoToUSD_Rate()
   res.status(200).json(response)
}