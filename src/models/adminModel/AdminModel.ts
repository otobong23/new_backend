import mongoose from "mongoose";
import { IAdmin } from "./adminModel.types";


const AdminSchema = new mongoose.Schema<IAdmin>({
   email: { type: String, require: [true, 'email field is required!'], lowercase: true, unique: true },
   password: { type: String, require: [true, 'password is required!'], select: false, trim: true },
   minDeposit: { type: Number, default: 10 },
   maxDeposit: { type: Number, default: 10 },
   minWithdrawal: { type: Number, default: 10 },
   maxWithdrawal: { type: Number, default: 10 },
   walletAddress: { type: String, required: true, default: '1NDHZtXsy1QPRt4sro23agUcFX1vqaWSGG' }
}, {
   timestamps: true,
})

const AdminModel = mongoose.model('admin', AdminSchema)
export default AdminModel

export const getAdmin = () => AdminModel.findOne()