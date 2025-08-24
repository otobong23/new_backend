import dotenv from 'dotenv'
import UserModel from '../models/userModel/UserModel'
import { NotFoundError } from 'Errors/Errors'
import { BLOCKCHAIN_NETWORKS_SYMBOLS } from 'constant/utilities.constant'

dotenv.config()

export class UserService {
   protected userModel: typeof UserModel
   protected readonly TRANSACTION_TYPES: string[] = ['deposit', 'withdraw']
   protected readonly TRANSACTION_STATUSES: string[] = ['pending', 'completed', 'failed']
   // protected readonly BLOCKCHAIN_NETWORKS: string[] = ['BTC', 'ETH', 'SOL', 'BNB', 'LTC', 'XRP', 'XLM', 'TRC', 'DOGE', 'POLYGON', 'LUNC', 'USDT', 'USDC', 'SHIBA', 'PEPE', 'TROLL']
   protected static readonly SYMBOL_TO_ID: Record<string, string> = BLOCKCHAIN_NETWORKS_SYMBOLS

   constructor() {
      this.userModel = UserModel
   }

   async getUserByEmail(email: string) {
      const existingUser = await this.userModel.findOne({ email })
      if (!existingUser) throw new NotFoundError('User does not exist');
      return existingUser;
   }
}

// const UserService = new UserServiceFunctions()
// export default UserService