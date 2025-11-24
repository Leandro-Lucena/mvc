"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const company_routes_1 = __importDefault(require("../modules/company/routes/company.routes"));
const errorHandle_1 = require("../shared/errors/errorHandle");
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/companies", company_routes_1.default);
app.use(errorHandle_1.errorHandler);
