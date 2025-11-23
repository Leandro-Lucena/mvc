import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { EmployeeServiceImpl } from "../services/EmployeeService";
import { CompanyServiceImpl } from "../../company/services/CompanyService";
import { EmployeeRepository } from "../../../interfaces/repositories/EmployeeRepository";

const router = Router();

const employeeRepository = new EmployeeRepository();
const companyService = new CompanyServiceImpl(employeeRepository);

const employeeService = new EmployeeServiceImpl(null, companyService);
const employeeController = new EmployeeController(employeeService);

router.post("/employee", employeeController.create);
router.put("/employee/:id", employeeController.update);
router.get("/employee/:id", employeeController.findById);
router.get("/employee/:companyId", employeeController.findByCompanyId);
router.delete("/employee/:id", employeeController.delete);

export default router;
