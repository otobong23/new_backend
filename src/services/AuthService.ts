import dotenv from 'dotenv'
import { BadRequestError, ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from '../Errors/Errors'
import hash from '../helpers/hashing'
import sendResetMail from '../mailers/defaultMailer'
import JWTService from '../middlewares/JWT.service'
import { UserService } from 'middlewares/User.service'

dotenv.config()



export class AuthServiceFunctions extends UserService {
   private jwtService: typeof JWTService
   private hashService: typeof hash

   constructor() {
      super();
      this.jwtService = JWTService
      this.hashService = hash
   }

   async signup(email: string, password: string, firstName: string, lastName: string) {
      const existingUser = await this.userModel.findOne({ email })
      if (existingUser) throw new ConflictError('User already exists');
      password = await this.hashService.doHash(password, Number(process.env.SALT_ROUNDS!))
      const newUser = new this.userModel({
         email, password, firstName, lastName
      })
      await newUser.save()
      const token = this.jwtService.generateToken({
         userId: newUser._id.toString(),
         email: newUser.email,
         verified: newUser.verified
      })
      return { success: true, message: 'User registered successfully', data: { user: newUser, token } }
   }

   async login(email: string, password: string) {
      const existingUser = await this.getUserByEmail(email)
      const isPasswordValid = await this.hashService.validateHash(password, existingUser.password)
      if (!isPasswordValid) throw new ConflictError('Invalid Credentials');
      const token = this.jwtService.generateToken({
         userId: existingUser._id.toString(),
         email: existingUser.email,
         verified: existingUser.verified
      })
      return { success: true, message: 'User Logged In Successfully', data: { user: existingUser, token } }
   }

   async isVerified(email: string) {
      const existingUser = await this.getUserByEmail(email)
      return { success: true, message: 'User verification status fetched successfully', data: { verified: existingUser.verified } }
   }

   async sendVerificationEmail(email: string) {
      const existingUser = await this.getUserByEmail(email)
      if (existingUser.verified) return { success: false, message: 'User is already verified' };
      const codeValue = Math.floor(Math.random() * 1000000).toString()
      const ResetMail = await sendResetMail(existingUser.email, existingUser.firstName, codeValue)
      if (!ResetMail) throw new InternalServerError('Error sending mail, try again later');
      const hashedCode = await this.hashService.doHash(codeValue, Number(process.env.SALT_ROUNDS!))
      existingUser.verificationToken = hashedCode
      existingUser.verificationTokenValidation = Date.now().toString()
      await existingUser.save()
      return { success: true, message: 'Verification email sent successfully' }
   }

   async verifyCode(email: string, code: string) {
      const existingUser = await this.userModel.findOne({ email }).select('+verificationToken +verificationTokenValidation')
      if (!existingUser) throw new NotFoundError('User does not exist');
      if (existingUser.verified) throw new ConflictError('User is already verified');
      if (!existingUser.verificationToken || !existingUser.verificationTokenValidation) {
         throw new BadRequestError('Verification code not found, please request a new one');
      }
      const TEN_MINUTES = 10 * 60 * 1000;
      const isExpired = Date.now() > (new Date(Number(existingUser.verificationTokenValidation!)).getTime() + TEN_MINUTES);
      if (isExpired) {
         existingUser.verificationToken = undefined;
         existingUser.verificationTokenValidation = undefined;
         await existingUser.save();
         throw new BadRequestError("Verification code has expired");
      }
      const isValid = await this.hashService.validateHash(String(code), existingUser.verificationToken)
      if (!isValid) throw new ConflictError('Invalid verification code');
      existingUser.verified = true
      existingUser.verificationToken = undefined
      existingUser.verificationTokenValidation = undefined
      await existingUser.save()
      return {
         success: true, message: 'User verified successfully', data: {
            user: {
               id: existingUser._id.toString(),
               email: existingUser.email,
               verified: existingUser.verified
            }
         }
      }
   }

   async sendForgotPasswordCode(email: string) {
      const existingUser = await this.getUserByEmail(email)
      const codeValue = Math.floor(Math.random() * 1000000).toString()
      const ResetMail = await sendResetMail(existingUser.email, existingUser.firstName, codeValue)
      if (!ResetMail) throw new InternalServerError('Error sending mail, try again later');
      const hashedCode = await this.hashService.doHash(codeValue, Number(process.env.SALT_ROUNDS!))
      existingUser.forgotPasswordCode = hashedCode
      existingUser.forgotPasswordCodeValidation = Date.now().toString()
      await existingUser.save()
      return { success: true, message: 'Password reset email sent successfully' }
   }

   async verifyForgotPasswordCode(email: string, code: string) {
      const existingUser = await this.userModel.findOne({ email }).select('+forgotPasswordCode +forgotPasswordCodeValidation')
      if (!existingUser) throw new NotFoundError('User does not exist');
      if (!existingUser.forgotPasswordCode || !existingUser.forgotPasswordCodeValidation) {
         throw new BadRequestError('Verification code not found, please request a new one');
      }
      const TEN_MINUTES = 10 * 60 * 1000;
      const isExpired = Date.now() > new Date(Number(existingUser.forgotPasswordCodeValidation!)).getTime() + TEN_MINUTES;
      if (isExpired) {
         existingUser.forgotPasswordCode = undefined;
         existingUser.forgotPasswordCodeValidation = undefined;
         await existingUser.save();
         throw new BadRequestError("Verification code has expired");
      }
      const isValid = await this.hashService.validateHash(code, existingUser.forgotPasswordCode!)
      if (!isValid) throw new ConflictError('Invalid verification code');
      existingUser.forgotPasswordCode = undefined
      existingUser.forgotPasswordCodeValidation = undefined
      await existingUser.save()

      const token = this.jwtService.generateToken({
         userId: existingUser._id.toString(),
         email: existingUser.email,
         verified: existingUser.verified
      }, '10m')

      return {
         success: true, message: 'Password reset code verified successfully', data: {
            user: {
               id: existingUser._id.toString(),
               email: existingUser.email,
            },
            token
         }
      }
   }

   async resetPassword(newPassword: string, token: string) {
      let payload: ResetPayload;
      try {
         payload = this.jwtService.verifyToken<ResetPayload>(token);
      } catch {
         throw new UnauthorizedError("Invalid or expired token");
      };
      const existingUser = await this.getUserByEmail(payload.email)

      const issuedAt = payload.iat * 1000;
      if (
         existingUser.passwordChangedAt &&
         issuedAt < existingUser.passwordChangedAt.getTime()
      ) {
         throw new UnauthorizedError("Token expired due to password change");
      }

      newPassword = await this.hashService.doHash(newPassword, Number(process.env.SALT_ROUNDS!))
      existingUser.password = newPassword
      existingUser.passwordChangedAt = new Date();
      await existingUser.save()
      return { success: true, message: 'Password reset successfully' }
   }
}

const AuthService = new AuthServiceFunctions()
export default AuthService