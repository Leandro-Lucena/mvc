"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CompanyController_1 = require("../controller/CompanyController");
const errorHandle_1 = require("../../../shared/errors/errorHandle");
const router = (0, express_1.Router)();
const companyController = new CompanyController_1.CompanyController();
router.post("/", (req, res, next) => companyController.create(req, res, next));
router.use(errorHandle_1.errorHandler);
