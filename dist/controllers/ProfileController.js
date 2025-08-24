"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const ProfileService_1 = __importDefault(require("../services/ProfileService"));
const getProfile = async (req, res) => {
    const { user } = req;
    const response = await ProfileService_1.default.getProfile(user.email);
    res.status(201).json(response);
};
exports.getProfile = getProfile;
