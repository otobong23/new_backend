import { Router } from "express";
import AuthRouter from "./AuthRouter";
import TransactionRouter from "./TransactionRouter";
import AdminRouter from "./AdminRouter";
import ProfileRouter from "./ProfileRouter";

const AppRouter = Router()

AppRouter.use('/auth', AuthRouter)
AppRouter.use('/transactions', TransactionRouter)
AppRouter.use('/admin', AdminRouter)
AppRouter.use('/profile', ProfileRouter)

export default AppRouter