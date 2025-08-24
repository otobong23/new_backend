import dotenv from 'dotenv'
import TransactionModel from 'models/transactionModel/TransactionModel'
import { BadRequestError, InternalServerError, NotFoundError } from 'Errors/Errors'
import { UserService } from 'middlewares/User.service'
import axios from 'axios'
import { sendTransactionMail } from 'mailers/defaultMailer'

dotenv.config()



export class TransactionServiceFunctions extends UserService {
   private transactionModel: typeof TransactionModel

   constructor() {
      super();
      this.transactionModel = TransactionModel
   }

   async deposit(email: string, amount: number, image: string, description: string = '', blockchain: BLOCKCHAIN_NETWORKS_TYPES) {
      const existingUser = await this.getUserByEmail(email)
      const SUPPORTED_BLOCKCHAIN_NETWORKS = Object.keys(TransactionServiceFunctions.SYMBOL_TO_ID);
      if (!SUPPORTED_BLOCKCHAIN_NETWORKS.includes(blockchain)) throw new BadRequestError('Unsupported Blockchain Network');
      const newTransaction = new this.transactionModel({
         userId: existingUser._id,
         email: existingUser.email,
         amount,
         image,
         description: description ?? 'Account Deposit',
         type: this.TRANSACTION_TYPES[0],
         status: this.TRANSACTION_STATUSES[0]
      })
      await newTransaction.save()
      try {
         await sendTransactionMail(existingUser.email, amount, newTransaction._id.toString(), this.TRANSACTION_TYPES[0], blockchain, newTransaction.createdAt.toString())
      } catch (error) {
         console.log("Failed to send deposit email:", error)
      }
      return { success: true, message: 'Deposit request submitted successfully', data: newTransaction }
   }

   async withdraw(email: string, amount: number, description: string = '', blockchain: BLOCKCHAIN_NETWORKS_TYPES, walletAddress: string) {
      const existingUser = await this.getUserByEmail(email)
      const SUPPORTED_BLOCKCHAIN_NETWORKS = Object.keys(TransactionServiceFunctions.SYMBOL_TO_ID);
      if (!SUPPORTED_BLOCKCHAIN_NETWORKS.includes(blockchain)) throw new BadRequestError('Unsupported Blockchain Network');
      if (existingUser.wallet.balances[blockchain] && existingUser.wallet.balances[blockchain] >= amount) existingUser.wallet.balances[blockchain] -= amount;
      else throw new NotFoundError(`You do not have ${blockchain} in your wallet`);
      const newTransaction = new this.transactionModel({
         userId: existingUser._id,
         email: existingUser.email,
         amount,
         walletAddress,
         description: description ?? 'Account Withdrawal',
         type: this.TRANSACTION_TYPES[1],
         status: this.TRANSACTION_STATUSES[0]
      })
      await newTransaction.save()
      await existingUser.save()
      try {
         await sendTransactionMail(existingUser.email, amount, newTransaction._id.toString(), this.TRANSACTION_TYPES[1], blockchain, newTransaction.createdAt.toString())
      } catch (error) {
         console.log("Failed to send withdrawal email:", error)
      }
      return { success: true, message: 'Withdrawal request submitted successfully', data: newTransaction }
   }

   async getUserTransactions(email: string, page: number = 1, limit: number = 50) {
      const existingUser = await this.getUserByEmail(email)
      limit = Math.max(1, Math.min(limit, 100))
      page = Math.max(1, page)
      const offset = (page - 1) * limit
      const [transactions, total] = await Promise.all([
         this.transactionModel.find({ userId: existingUser._id }).sort({ date: -1 }).limit(limit).skip(offset).exec(),
         this.transactionModel.countDocuments({ userId: existingUser._id })
      ])
      const totalPages = total === 0 ? 1 : Math.ceil(total / limit)
      return {
         success: true, message: 'Transactions fetched successfully', data: {
            transactions,
            total,
            currentPage: page,
            totalPages,
            limit,
            user: {
               email: existingUser.email,
               balances: existingUser.wallet.balances
            }
         }
      }
   }

   async getCryptoToUSD_Rate() {
      try {
         const ids = Object.values(TransactionServiceFunctions.SYMBOL_TO_ID).join(",");
         const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`)
         const { data } = response
         // reverse map: { bitcoin: "BTC", ethereum: "ETH", ... }
         const idToSymbol: Record<string, string> = Object.entries(TransactionServiceFunctions.SYMBOL_TO_ID)
            .reduce((acc, [symbol, id]) => {
               acc[id] = symbol;
               return acc;
            }, {} as Record<string, string>);

         // map response
         const mapped = Object.entries(data).map(([id, priceObj]) => ({
            symbol: idToSymbol[id] || id, // fallback to id if not found
            id,
            ...(typeof priceObj === 'object' && priceObj !== null ? priceObj : {})
         }));
         return { success: true, message: 'Crypto to USD rate fetched successfully', data: mapped }
      } catch (error) {
         throw new InternalServerError('Failed to fetch crypto to USD rate')
      }
   }
}

const TransactionService = new TransactionServiceFunctions()
export default TransactionService