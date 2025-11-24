import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { EmployeeServiceImpl } from "../services/EmployeeService";
import { CompanyServiceImpl } from "../../company/services/CompanyService";
import { InMemoryEmployeeRepository } from "../repositories/InMemoryEmployeeRepository";

const router = Router();

const companyService = new CompanyServiceImpl(employeeRepository);

const employeeRepository = new InMemoryEmployeeRepository();
const employeeService = new EmployeeServiceImpl(
  employeeRepository,
  companyService
);
const employeeController = new EmployeeController(employeeService);

router.post("/employee", employeeController.create);
router.put("/employee/:id", employeeController.update);
router.get("/employee/:id", employeeController.findById);
router.get("/employee/:companyId", employeeController.findByCompanyId);
router.delete("/employee/:id", employeeController.delete);

export default router;
