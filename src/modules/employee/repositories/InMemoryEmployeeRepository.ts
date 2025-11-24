import { EmployeeRepository } from "../../../interfaces/repositories/EmployeeRepository";
import { NotFoundError } from "../../../shared/errors/AppError";
import { CreateEmployeeDTO } from "../dtos/CreateEmployeeDTO";
import { UpdateEmployeeDTO } from "../dtos/UpdateEmployeeDTO";
import { Employee } from "../models/Employee";
import { v4 as uuidv4 } from "uuid";

let employees: Employee[] = [];
export class InMemoryEmployeeRepository implements EmployeeRepository {
  constructor() {}

  async create(createEmployeeDTO: CreateEmployeeDTO): Promise<Employee> {
    const newEmployee = {
      ...createEmployeeDTO,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    employees.push(newEmployee);
    return newEmployee;
  }

  async update(
    id: string,
    updatedEmployeeDTO: UpdateEmployeeDTO
  ): Promise<Employee> {
    const employeeIndex = employees.findIndex((employee) => employee.id === id);
    if (employeeIndex === -1) {
      throw new NotFoundError("Employee not found");
    }
    const updatedEmployee = {
      ...employees[employeeIndex],
      ...updatedEmployeeDTO,
      updatedAt: new Date(),
    };
    employees[employeeIndex] = updatedEmployee;
    return updatedEmployee;
  }

  async delete(id: string): Promise<void> {
    const employeeIndex = employees.findIndex((employee) => employee.id === id);
    if (employeeIndex === -1) {
      throw new NotFoundError("Employee not found");
    }
    employees.splice(employeeIndex, 1);
  }

  async findByCompanyId(companyId: string): Promise<Employee[]> {
    return employees.filter((employee) => employee.companyId === companyId);
  }

  async findById(id: string): Promise<Employee> {
    const employee = employees.find((employee) => employee.id === id);
    if (!employee) {
      throw new NotFoundError("Employee not found");
    }
    return employee;
  }
}
