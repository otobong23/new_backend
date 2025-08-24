"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileServiceFunctions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const User_service_1 = require("../middlewares/User.service");
dotenv_1.default.config();
class ProfileServiceFunctions extends User_service_1.UserService {
    constructor() {
        super();
    }
    async getProfile(email) {
        const existingUser = await this.getUserByEmail(email);
        return { success: true, message: 'User Profile retrieved Successfully', data: { user: { ...existingUser.toObject(), password: undefined, __v: undefined } } };
    }
}
exports.ProfileServiceFunctions = ProfileServiceFunctions;
const ProfileService = new ProfileServiceFunctions();
exports.default = ProfileService;
