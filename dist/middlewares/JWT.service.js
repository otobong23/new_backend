"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTServiceFunctions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
class JWTServiceFunctions {
    jwtService;
    constructor() {
        this.jwtService = jsonwebtoken_1.default;
    }
    generateToken(payload, expiresIn = '30d') {
        return this.jwtService.sign(payload, process.env.JWT_SECRET, { expiresIn });
    }
    verifyToken(token) {
        return this.jwtService.verify(token, process.env.JWT_SECRET);
    }
}
exports.JWTServiceFunctions = JWTServiceFunctions;
const JWTService = new JWTServiceFunctions();
exports.default = JWTService;
