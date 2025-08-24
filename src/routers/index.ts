import { Router } from "express";
import AuthRouter from "./AuthRouter";
import TransactionRouter from "./TransactionRouter";
import AdminRouter from "./AdminRouter";

const AppRouter = Router()

AppRouter.use('/auth', AuthRouter)
AppRouter.use('/transactions', TransactionRouter)
AppRouter.use('/admin', AdminRouter)

export default AppRouter