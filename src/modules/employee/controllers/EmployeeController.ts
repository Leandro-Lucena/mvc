import { Request, Response } from "express";
import { EmployeeService } from "../../../interfaces/services/EmployeeService";
import { responseSuccess } from "../../../shared/helpers/responseSuccess";
import { validateId } from "../../company/validators/validateId";
import { validateCreateEmployee } from "../validators/validateCreateEmployee";
import { validateUpdateEmployee } from "../validators/validateUpdateEmployee";

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  async create(req: Request, res: Response): Promise<Response> {
    const data = await validateCreateEmployee(req.body);
    const employee = this.employeeService.create(data);
    return responseSuccess(res, employee, "Employee created successfully");
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = validateId(req.params.id);
    const data = await validateUpdateEmployee(req.body);
    const employee = this.employeeService.update(id, data);
    return responseSuccess(res, employee, "Employee updated successfully");
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = validateId(req.params.id);
    const employee = await this.employeeService.findById(id);
    return responseSuccess(res, employee, "Employee found successfully");
  }

  async findByCompanyId(req: Request, res: Response): Promise<Response> {
    const companyId = validateId(req.params.companyId);
    const employees = await this.employeeService.findByCompanyId(companyId);
    return responseSuccess(res, employees, "Employees found successfully");
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const id = validateId(req.params.id);
    await this.employeeService.delete(id);
    return responseSuccess(res, null, "Employee deleted successfully");
  }
}
