import express from "express";

import companyRoutes from "../modules/company/routes/company.routes";
import { errorHandler } from "../shared/errors/errorHandler";

const app = express();

app.use(express.json());

app.use("/companies", companyRoutes);

app.use(errorHandler);

export { app };
