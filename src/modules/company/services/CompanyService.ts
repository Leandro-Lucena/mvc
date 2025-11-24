import { CompanyService } from "../../../interfaces/services/CompanyService";
import { Company } from "../models/Company";
import { CreateCompanyDTO } from "../dtos/CreateCompanyDTO";
import { UpdateCompanyDTO } from "../dtos/UpdateCompanyDTO";
import { CompanyRepository } from "../../../interfaces/repositories/CompanyRepository";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../../../shared/errors/AppError";
import { DocumentValidator } from "../../../shared/utils/documentValidator";

export class CompanyServiceImpl implements CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async create(createCompanyDTO: CreateCompanyDTO): Promise<Company> {
    if (!DocumentValidator.validateCNPJ(createCompanyDTO.cnpj)) {
      throw new BadRequestError("Invalid CNPJ");
    }

    const existingCompany = await this.companyRepository.findByCNPJ(
      createCompanyDTO.cnpj
    );

    if (existingCompany) {
      throw new BadRequestError("Company already exists");
    }

    return await this.companyRepository.create(createCompanyDTO);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.findAll();
  }

  async findByCNPJ(cnpj: string): Promise<Company> {
    return await this.companyRepository.findByCNPJ(cnpj);
  }

  async findById(id: string): Promise<Company> {
    return await this.companyRepository.findById(id);
  }

  async update(
    id: string,
    updateCompanyDTO: UpdateCompanyDTO
  ): Promise<Company> {
    const existingCompany = await this.companyRepository.findById(id);
    if (!existingCompany) {
      throw new NotFoundError("Company not found");
    }

    if (
      updateCompanyDTO.cnpj &&
      existingCompany.cnpj !== updateCompanyDTO.cnpj
    ) {
      if (!DocumentValidator.validateCNPJ(updateCompanyDTO.cnpj)) {
        throw new BadRequestError("Invalid CNPJ");
      }

      const company = await this.companyRepository.findByCNPJ(
        updateCompanyDTO.cnpj
      );

      if (company && company.id !== id) {
        throw new ConflictError(
          "Another company with this CNPJ already exists"
        );
      }
    }

    return await this.companyRepository.update(id, updateCompanyDTO);
  }

  async delete(id: string): Promise<void> {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return await this.companyRepository.delete(id);
  }
}
