import { Types } from "mongoose";

export interface ITransaction {
   userId: Types.ObjectId
   email: string
   amount: number
   blockchain: BLOCKCHAIN_NETWORKS_TYPES
   image?: string
   walletAddress: string
   type: 'deposit' | 'withdraw'
   status: TRANSACTION_STATUSES_TYPES
   description?: string
   createdAt: Date
   updatedAt: Date
}