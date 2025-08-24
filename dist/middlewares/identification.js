"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifer = void 0;
const Errors_1 = require("../Errors/Errors");
const JWT_service_1 = __importDefault(require("./JWT.service"));
const identifer = (req, res, next) => {
    let token;
    if (req.headers.client === 'not-browser')
        token = req.cookies['Authorization'];
    else
        token = req.headers.authorization;
    if (!token)
        throw new Errors_1.UnauthorizedError('No token provided');
    try {
        const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        const jwtVerified = JWT_service_1.default.verifyToken(actualToken);
        req.user = jwtVerified;
        next();
    }
    catch (error) {
        throw new Errors_1.UnauthorizedError(error.message ?? "Invalid or expired token");
    }
};
exports.identifer = identifer;
