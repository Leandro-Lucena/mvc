"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const validateCreateCompany_1 = require("../validators/validateCreateCompany");
const responseSuccess_1 = require("../../../shared/helpers/responseSuccess");
const validateCNPJ_1 = require("../validators/validateCNPJ");
class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async create(req, res) {
        const data = (0, validateCreateCompany_1.validateCreateCompany)(req.body);
        const company = await this.companyService.create(data);
        return (0, responseSuccess_1.responseSuccess)(res, company, "Company created successfully", 201);
    }
    async findAll(req, res) {
        const companies = await this.companyService.findAll();
        return (0, responseSuccess_1.responseSuccess)(res, companies, "Companies found successfully");
    }
    async findByCNPJ(req, res) {
        const cnpj = (0, validateCNPJ_1.validateCNPJ)(req.params.cnpj);
        const company = await this.companyService.findByCNPJ(cnpj);
        return (0, responseSuccess_1.responseSuccess)(res, company, "Company found successfully");
    }
    async findById(req, res) {
        const company = await this.companyService.findById(req.params.id);
        return (0, responseSuccess_1.responseSuccess)(res, company, "Company found successfully");
    }
    async delete(req, res) {
        await this.companyService.delete(req.params.id);
        return (0, responseSuccess_1.responseSuccess)(res, null, "Company deleted successfully", 204);
    }
}
exports.CompanyController = CompanyController;
