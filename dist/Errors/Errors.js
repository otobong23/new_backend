"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.ValidationError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    statusCode;
    isOperational;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // helps distinguish from programming errors
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
// 400 – Bad Request
class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
// 401 – Unauthorized
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
// 403 – Forbidden
class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(message, 403);
    }
}
exports.ForbiddenError = ForbiddenError;
// 404 – Not Found
class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
// 409 – Conflict
class ConflictError extends AppError {
    constructor(message = "Conflict") {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
// 422 – Unprocessable Entity (e.g., validation errors)
class ValidationError extends AppError {
    constructor(message = "Validation failed") {
        super(message, 422);
    }
}
exports.ValidationError = ValidationError;
// 500 – Internal Server Error
class InternalServerError extends AppError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}
exports.InternalServerError = InternalServerError;
