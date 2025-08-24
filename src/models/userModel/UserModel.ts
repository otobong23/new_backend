import mongoose from "mongoose";
import { IUser, IWallet } from "./userModel.types";
import { Model } from "mongoose";

const CryptoBalanceSchema = new mongoose.Schema({
   BTC: { type: Number, default: 0 },
   ETH: { type: Number, default: 0 },
   SOL: { type: Number, default: 0 },
   BNB: { type: Number, default: 0 },
   XRP: { type: Number, default: 0 },
   LTC: { type: Number, default: 0 },
   XLM: { type: Number, default: 0 },
   TRC: { type: Number, default: 0 },
   DOGE: { type: Number, default: 0 },
   POLYGON: { type: Number, default: 0 },
   LUNC: { type: Number, default: 0 },
   USDT: { type: Number, default: 0 },
   USDC: { type: Number, default: 0 },
   SHIBA: { type: Number, default: 0 },
   PEPE: { type: Number, default: 0 },
   TROLL: { type: Number, default: 0 },
})

const WalletSchema = new mongoose.Schema<IWallet>({
   balances: { type: CryptoBalanceSchema, default: () => ({}) }
})

const UserSchema = new mongoose.Schema<IUser>({
   firstName: { type: String, required: [true, 'first name is required!'] },
   lastName: { type: String, required: [true, 'last name is required!'] },
   email: { type: String, required: [true, 'email field is required!'], lowercase: true, unique: true },
   password: { type: String, required: [true, 'password is required!'], select: true, trim: true },
   verified: { type: Boolean, default: false },
   verificationToken: { type: String, select: false },
   verificationTokenValidation: { type: String, select: false },
   forgotPasswordCode: { type: String, select: false },
   forgotPasswordCodeValidation: { type: String, select: false },
   passwordChangedAt: { type: Date, select: false },
   wallet: { type: WalletSchema, default: () => ({}) },
   activation: { type: Boolean, default: false }
}, {
   timestamps: true
})

UserSchema.statics.search = function (keyword: string) {
   const regex = new RegExp(keyword, 'i'); // case-insensitive
   return this.find({
      $or: [
         { email: regex },
         { firstName: regex },
         { lastName: regex },
      ]
   });
};

const UserModel = mongoose.model<IUser, Model<IUser> & { search: (keyword: string) => Promise<IUser[]> }>('user', UserSchema);
export default UserModel