import { getProfile } from "controllers/ProfileController";
import { asyncResponseHandler } from "Errors/ErrorHandler";
import { Router } from "express";
import { identifer } from "middlewares/identification";

const ProfileRouter = Router()
ProfileRouter.get('/', identifer, asyncResponseHandler(getProfile))

export default ProfileRouter