import dotenv from 'dotenv'
import { UserService } from 'middlewares/User.service'

dotenv.config()

export class ProfileServiceFunctions extends UserService {
   constructor() {
      super ()
   }
   
   async getProfile(email: string) {
      const existingUser = await this.getUserByEmail(email)
      return { success: true, message: 'User Profile retrieved Successfully', data: { user: { ...existingUser.toObject(), password: undefined, __v: undefined } } }
   }
}

const ProfileService = new ProfileServiceFunctions()
export default ProfileService