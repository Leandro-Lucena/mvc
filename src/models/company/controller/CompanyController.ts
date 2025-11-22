import { NextFunction, Request, Response } from "express";
import { validateCreateCompany } from "../validators/validateCreateCompany";
import { CompanyService } from "../../../interfaces/CompanyService";
import { responseSuccess } from "../../../shared/helpers/responseSuccess";
import { validateCNPJ } from "../validators/validateCNPJ";
import { validateId } from "../validators/validateId";
import { validateUpdateCompany } from "../validators/validateUpdateCompany";

export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const data = validateCreateCompany(req.body);

    const company = await this.companyService.create(data);

    return responseSuccess(res, company, "Company created successfully", 201);
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const companies = await this.companyService.findAll();

    return responseSuccess(res, companies, "Companies found successfully");
  }

  async findByCNPJ(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const cnpj = validateCNPJ(req.params.cnpj);
    const company = await this.companyService.findByCNPJ(cnpj);

    return responseSuccess(res, company, "Company found successfully");
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const id = validateId(req.params.id);
    const company = await this.companyService.findById(id);

    return responseSuccess(res, company, "Company found successfully");
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const id = validateId(req.params.id);
    const data = validateUpdateCompany(req.body);
    const company = await this.companyService.update(id, data);

    return responseSuccess(res, company, "Company updated successfully");
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const id = validateId(req.params.id);
    await this.companyService.delete(id);

    return responseSuccess(res, null, "Company deleted successfully", 204);
  }
}
