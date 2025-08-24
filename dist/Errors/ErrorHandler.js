"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.asyncResponseHandler = exports.ValidatorErrorChecker = void 0;
const Errors_1 = require("./Errors");
// import { VoidExpression } from "typescript";
const ValidatorErrorChecker = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400).json({ success: false, message: error.details[0].message });
            return;
        }
        next();
    };
};
exports.ValidatorErrorChecker = ValidatorErrorChecker;
// export const ResponseErrorWrapper = (req: Request, res: Response, callBack: () => VoidExpression) => {
//    try {
//       callBack();
//    } catch (e) {
//       const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
//       res.status(500).send({ success: false, message: errorMessage })
//       return;
//    }
// }
const asyncResponseHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncResponseHandler = asyncResponseHandler;
const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
    if (err instanceof Errors_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: process.env.NODE_ENV === "production" ? undefined : err,
        });
    }
    // fallback for unexpected errors
    res.status(500).json({
        success: false,
        message: "An unexpected error occurred",
        stack: process.env.NODE_ENV === "production" ? undefined : err,
    });
};
exports.errorHandler = errorHandler;
