import { CreateEmployeeDTO } from "../../modules/employee/dtos/CreateEmployeeDTO";
import { UpdateEmployeeDTO } from "../../modules/employee/dtos/UpdateEmpolyeeDTO";

export interface EmployeeService {
  create(createEmployeeDTO: CreateEmployeeDTO): Promise<void>;
  update(id: string, updateEmployeeDTO: UpdateEmployeeDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<void>;
  findByCompanyId(companyId: string): Promise<void[]>;
}
