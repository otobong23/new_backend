
export interface IAdmin extends Document {
  email: string
  password: string
  minDeposit: number
  maxDeposit: number
  minWithdrawal: number
  maxWithdrawal: number
  walletAddress: string
}