import { CreateCompanyDTO } from "../models/company/dtos/CreateCompanyDTO";
import { UpdateCompanyDTO } from "../models/company/dtos/UpdateCompanyDTO";

export interface CompanyService {
  create(createCompanyDTO: CreateCompanyDTO): Promise<any>;
  findAll(): Promise<any[]>;
  findByCNPJ(cnpj: string): Promise<any>;
  findById(id: string): Promise<any>;
  delete(id: string): Promise<void>;
  update(id: string, updateCompanyDTO: UpdateCompanyDTO): Promise<any>;
}
