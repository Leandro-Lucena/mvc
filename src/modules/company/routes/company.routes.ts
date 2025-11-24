import { Router } from "express";
import { CompanyServiceImpl } from "../services/CompanyService";
import { InMemoryCompanyRepository } from "../repositories/InMemoryCompanyRepository";
import { CompanyController } from "../controller/CompanyController";
import { asyncHandler } from "../../../shared/errors/errorHandler";

const router = Router();

const companyRepository = new InMemoryCompanyRepository();
const companyService = new CompanyServiceImpl(companyRepository);
const companyController = new CompanyController(companyService);

router.post(
  "/companies",
  asyncHandler(companyController.create.bind(companyController))
);
router.get(
  "/companies",
  asyncHandler(companyController.findAll.bind(companyController))
);
router.get(
  "/companies/:id",
  asyncHandler(companyController.findById.bind(companyController))
);
router.get(
  "/companies/cnpj/:cnpj",
  asyncHandler(companyController.findByCNPJ.bind(companyController))
);
router.put(
  "/companies/:id",
  asyncHandler(companyController.update.bind(companyController))
);
router.delete(
  "/companies/:id",
  asyncHandler(companyController.delete.bind(companyController))
);

export default router;
