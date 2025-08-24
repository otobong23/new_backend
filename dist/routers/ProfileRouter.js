"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProfileController_1 = require("../controllers/ProfileController");
const ErrorHandler_1 = require("../Errors/ErrorHandler");
const express_1 = require("express");
const identification_1 = require("../middlewares/identification");
const ProfileRouter = (0, express_1.Router)();
ProfileRouter.get('/', identification_1.identifer, (0, ErrorHandler_1.asyncResponseHandler)(ProfileController_1.getProfile));
exports.default = ProfileRouter;
