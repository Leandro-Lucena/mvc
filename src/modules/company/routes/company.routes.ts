import { Router } from "express";
import { CompanyController } from "../controller/CompanyController";
import { errorHandler } from "../../../shared/errors/errorHandle";
import { CompanyServiceImpl } from "../services/CompanyService";

const router = Router();

const companyService = new CompanyServiceImpl();
const companyController = new CompanyController(companyService);

router.post("/", (req, res, next) => companyController.create(req, res, next));
router.get("/", (req, res, next) => companyController.findAll(req, res, next));
router.get("/:id", (req, res, next) =>
  companyController.findById(req, res, next)
);
router.get("/cnpj/:cnpj", (req, res, next) =>
  companyController.findByCNPJ(req, res, next)
);
router.put("/:id", (req, res, next) =>
  companyController.update(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  companyController.delete(req, res, next)
);

router.use(errorHandler);
