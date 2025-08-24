import mongoose, { Schema } from "mongoose";
import { ITransaction } from "./transactionModel.types";
import { BLOCKCHAIN_NETWORKS_SYMBOLS } from "constant/utilities.constant";

const TransactionSchema: Schema<ITransaction> = new Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
   email: { type: String, required: true },
   amount: { type: Number, required: true },
   blockchain: { type: String, enum: Object.keys(BLOCKCHAIN_NETWORKS_SYMBOLS), required: true, default: 'USDT' },
   image: { type: String },
   walletAddress: { type: String },
   type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
   status: { type: String, enum: ['pending', 'completed', 'failed'], required: true, default: 'pending' },
   description: { type: String, trim: true },
}, {
   timestamps: true
})

const TransactionModel = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default TransactionModel