"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const doHash = (value, saltRounds) => {
    // bcryptjs only works with string, not Buffer
    const valueStr = typeof value === 'string' ? value : value.toString();
    return bcryptjs_1.default.hash(valueStr, Number(saltRounds));
};
const validateHash = (value, hashed) => {
    const valueStr = typeof value === 'string' ? value : value.toString();
    return bcryptjs_1.default.compare(valueStr, hashed);
};
exports.validateHash = validateHash;
const hash = { doHash, validateHash: exports.validateHash };
exports.default = hash;
