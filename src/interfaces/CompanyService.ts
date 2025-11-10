import { CreateCompanyDTO } from "../models/company/dtos/CreateCompanyDTO";

export interface CompanyService {
  create(createCompanyDTO: CreateCompanyDTO): Promise<any>;
}
