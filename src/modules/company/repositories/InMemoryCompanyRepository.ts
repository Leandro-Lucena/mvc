import { CompanyRepository } from "../../../interfaces/repositories/CompanyRepository";
import { NotFoundError } from "../../../shared/errors/AppError";
import { v4 as uuidv4 } from "uuid";
import { Company } from "../models/Company";
import { CreateCompanyDTO } from "../dtos/CreateCompanyDTO";
import { UpdateCompanyDTO } from "../dtos/UpdateCompanyDTO";

let companies: Company[] = [];
export class InMemoryCompanyRepository implements CompanyRepository {
  constructor() {}

  async create(createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    const newCompany = {
      ...createCompanyDTO,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    companies.push(newCompany);
    return newCompany;
  }

  async update(
    id: string,
    updatedCompanyDTO: UpdateCompanyDTO
  ): Promise<Company> {
    const companyIndex = companies.findIndex((company) => company.id === id);
    if (companyIndex === -1) {
      throw new NotFoundError("Company not found");
    }

    const currentCompany = companies[companyIndex];

    const updatedCompany = {
      ...currentCompany,
      ...updatedCompanyDTO,
      address:
        updatedCompanyDTO.address && currentCompany.address
          ? {
              street:
                updatedCompanyDTO.address.street ??
                currentCompany.address.street,
              number:
                updatedCompanyDTO.address.number ??
                currentCompany.address.number,
              city:
                updatedCompanyDTO.address.city ?? currentCompany.address.city,
              zipcode:
                updatedCompanyDTO.address.zipcode ??
                currentCompany.address.zipcode,
              state:
                updatedCompanyDTO.address.state ?? currentCompany.address.state,
            }
          : currentCompany.address,
      updatedAt: new Date(),
    };

    companies[companyIndex] = updatedCompany;
    return updatedCompany;
  }

  async delete(id: string): Promise<any> {
    const companyIndex = companies.findIndex((company) => company.id === id);
    if (companyIndex === -1) {
      throw new NotFoundError("Company not found");
    }
    companies.splice(companyIndex, 1);
  }

  async findAll(): Promise<Company[]> {
    return [...companies];
  }

  async findByCNPJ(cnpj: string): Promise<Company> {
    const company = companies.find((company) => company.cnpj === cnpj);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  }

  async findByCompanyId(companyId: string): Promise<Company> {
    const company = companies.find((company) => company.id === companyId);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  }

  async findById(id: string): Promise<Company> {
    const company = companies.find((company) => company.id === id);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  }
}
