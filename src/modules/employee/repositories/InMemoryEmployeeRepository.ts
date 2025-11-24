import { EmployeeRepository } from "../../../interfaces/repositories/EmployeeRepository";
import { NotFoundError } from "../../../shared/errors/AppError";
import { CreateEmployeeDTO } from "../dtos/CreateEmployeeDTO";
import { UpdateEmployeeDTO } from "../dtos/UpdateEmployeeDTO";
import { Employee } from "../models/Employee";
import { v4 as uuidv4 } from "uuid";

export class InMemoryEmployeeRepository implements EmployeeRepository {
  private employees: Employee[] = [];

  constructor() {}

  async create(createEmployeeDTO: CreateEmployeeDTO): Promise<Employee> {
    const newEmployee = {
      ...createEmployeeDTO,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  async update(
    id: string,
    updatedEmployeeDTO: UpdateEmployeeDTO
  ): Promise<Employee> {
    const employeeIndex = this.employees.findIndex(
      (employee) => employee.id === id
    );
    if (employeeIndex === -1) {
      throw new NotFoundError("Employee not found");
    }
    const updatedEmployee = {
      ...this.employees[employeeIndex],
      ...updatedEmployeeDTO,
      updatedAt: new Date(),
    };
    this.employees[employeeIndex] = updatedEmployee;
    return updatedEmployee;
  }

  async delete(id: string): Promise<void> {
    const employeeIndex = this.employees.findIndex(
      (employee) => employee.id === id
    );
    if (employeeIndex === -1) {
      throw new NotFoundError("Employee not found");
    }
    this.employees.splice(employeeIndex, 1);
  }

  async findByCompanyId(companyId: string): Promise<Employee[]> {
    return this.employees.filter(
      (employee) => employee.companyId === companyId
    );
  }

  async findById(id: string): Promise<Employee> {
    const employee = this.employees.find((employee) => employee.id === id);
    if (!employee) {
      throw new NotFoundError("Employee not found");
    }
    return employee;
  }
}
