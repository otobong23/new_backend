import { adminLogin, deleteTransaction, deleteUser, getAdmin, getAllTransactions, getAllUsers, getTotalUsers, getUser, getUserTransactions, searchUsers, updateAdmin, updateTransaction, updateUser, updateUserBlockchainBalance } from "controllers/AdminController";
import { asyncResponseHandler, ValidatorErrorChecker } from "Errors/ErrorHandler";
import { Router } from "express";
import { identifer } from "middlewares/identification";
import { idValidator, updateAdminValidator, updateTransactionValidator, updateUserBlockchainBalanceValidator, userValidator } from "validators/AdminValidator";
import { emailValidator, loginValidator } from "validators/AuthValidator";
import { paginationValidator } from "validators/TransactionValidator";


const AdminRouter = Router();

// Admin Routes
AdminRouter.post('/login', ValidatorErrorChecker(loginValidator), asyncResponseHandler(adminLogin))
AdminRouter.patch('/', identifer, ValidatorErrorChecker(updateAdminValidator), asyncResponseHandler(updateAdmin))
AdminRouter.get('/', asyncResponseHandler(getAdmin))

// Users Routes
AdminRouter.get('/total-users', identifer, asyncResponseHandler(getTotalUsers))
AdminRouter.get('/all-users', identifer, ValidatorErrorChecker(paginationValidator), asyncResponseHandler(getAllUsers))
AdminRouter.get('/all-users/user', identifer, ValidatorErrorChecker(emailValidator), asyncResponseHandler(getUser))
AdminRouter.patch('/all-users/user', identifer, ValidatorErrorChecker(userValidator), asyncResponseHandler(updateUser))
AdminRouter.patch('/all-users/user/balance', identifer, ValidatorErrorChecker(updateUserBlockchainBalanceValidator), asyncResponseHandler(updateUserBlockchainBalance))
AdminRouter.delete('/all-users/user', identifer, ValidatorErrorChecker(emailValidator), asyncResponseHandler(deleteUser))
AdminRouter.get('/all-users/search', identifer, asyncResponseHandler(searchUsers))

// Transaction Routes
AdminRouter.get('/all-transactions', identifer, ValidatorErrorChecker(paginationValidator), asyncResponseHandler(getAllTransactions))
AdminRouter.patch('/all-transactions', identifer, ValidatorErrorChecker(updateTransactionValidator), asyncResponseHandler(updateTransaction))
AdminRouter.delete('/all-transactions', identifer, ValidatorErrorChecker(idValidator), asyncResponseHandler(deleteTransaction))
AdminRouter.get('/user-transactions', identifer, ValidatorErrorChecker(paginationValidator), asyncResponseHandler(getUserTransactions))

export default AdminRouter;