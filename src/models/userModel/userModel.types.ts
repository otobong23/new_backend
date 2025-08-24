
export interface IUser extends Document {
   firstName: string
   lastName: string
   email: string
   password: string
   verified: boolean
   verificationToken?: string
   verificationTokenValidation?: string
   forgotPasswordCode?: string
   forgotPasswordCodeValidation?: string
   passwordChangedAt?: Date
   wallet: IWallet
   activation: boolean
   createdAt: Date
   updatedAt: Date
}

export interface ICryptoBalance {
   BTC: number
   ETH: number
   SOL: number
   BNB: number
   XRP: number
   LTC: number
   XLM: number
   TRC: number
   DOGE: number
   POLYGON: number
   LUNC: number
   USDT: number
   USDC: number
   SHIBA: number
   PEPE: number
   TROLL: number
}


export interface IWallet {
   balances: ICryptoBalance
}