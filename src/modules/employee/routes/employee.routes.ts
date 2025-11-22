import { Router } from "express";
import { EmployeeController } from "../controllers/EmployeeController";

const router = Router();

const employeeController = new EmployeeController();

router.post("/employee", employeeController.create);
router.put("/employee/:id", employeeController.update);
router.get("/employee/:id", employeeController.findById);
router.get("/employee/:companyId", employeeController.findByCompanyId);
router.delete("/employee/:id", employeeController.delete);

export default router;
