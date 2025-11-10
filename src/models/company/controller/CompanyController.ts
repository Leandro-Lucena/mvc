import { Request, Response } from "express";
import { validateCreateCompany } from "../validators/validateCreateCompany";
import { CompanyService } from "../../../interfaces/CompanyService";
import { InternalServerError } from "../../../../bkp/shared/errors/AppError";

export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = validateCreateCompany(req.body);

      const result = await this.companyService.create(data);

      return res.status(200).json(result);
    } catch (error: any) {
      return res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }
}
