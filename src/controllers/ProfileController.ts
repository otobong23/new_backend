import { Request, Response } from "express"
import ProfileService from "services/ProfileService"

export const getProfile = async (req: Request, res: Response) => {
   const { user } = req
   const response = await ProfileService.getProfile(user.email)
   res.status(201).json(response)
}