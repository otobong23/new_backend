import { deposit, getCryptoToUSD_Rate, getUserTransactions, withdraw } from "controllers/TransactionController";
import { asyncResponseHandler, ValidatorErrorChecker } from "Errors/ErrorHandler";
import { Router } from "express";
import { identifer } from "middlewares/identification";
import { depositValidator, paginationValidator, withdrawValidator } from "validators/TransactionValidator";


const TransactionRouter = Router()

TransactionRouter.post('/deposit', identifer, ValidatorErrorChecker(depositValidator), asyncResponseHandler(deposit))
TransactionRouter.post('/withdraw', identifer, ValidatorErrorChecker(withdrawValidator), asyncResponseHandler(withdraw))
TransactionRouter.get('/user-transactions', identifer, ValidatorErrorChecker(paginationValidator), asyncResponseHandler(getUserTransactions))
TransactionRouter.get('/getCryptoRate', identifer, asyncResponseHandler(getCryptoToUSD_Rate))

export default TransactionRouter