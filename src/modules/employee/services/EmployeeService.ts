import { EmployeeRepository } from "../../../interfaces/repositories/EmployeeRepository";
import { CompanyService } from "../../../interfaces/services/CompanyService";
import { EmployeeService } from "../../../interfaces/services/EmployeeService";
import {
  BadRequestError,
  NotFoundError,
} from "../../../shared/errors/AppError";
import { DocumentValidator } from "../../../shared/utils/documentValidator";
import { CreateEmployeeDTO } from "../dtos/CreateEmployeeDTO";
import { UpdateEmployeeDTO } from "../dtos/UpdateEmpolyeeDTO";
import { Employee } from "../models/Employee";

export class EmployeeServiceImpl implements EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly companyService: CompanyService
  ) {}

  async create(createEmployeeDTO: CreateEmployeeDTO): Promise<Employee> {
    if (!DocumentValidator.validateCPF(createEmployeeDTO.cpf)) {
      throw new BadRequestError("Invalid CPF");
    }

    const company = await this.companyService.findById(
      createEmployeeDTO.companyId
    );

    if (!company) {
      throw new NotFoundError("Company not found");
    }

    return await this.employeeRepository.create(createEmployeeDTO);
  }

  async update(
    id: string,
    updateEmployeeDTO: UpdateEmployeeDTO
  ): Promise<Employee> {
    const employee = this.employeeRepository.update(id, updateEmployeeDTO);
    if (!employee) {
      throw new NotFoundError("Employee not found");
    }
    return await this.employeeRepository.update(id, updateEmployeeDTO);
  }

  async delete(id: string): Promise<void> {
    return await this.employeeRepository.delete(id);
  }

  async findById(id: string): Promise<Employee> {
    return await this.employeeRepository.findById(id);
  }

  async findByCompanyId(companyId: string): Promise<Employee[]> {
    return await this.employeeRepository.findByCompanyId(companyId);
  }
}
