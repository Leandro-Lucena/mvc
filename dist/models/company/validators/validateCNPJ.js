"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCNPJ = validateCNPJ;
const zod_1 = require("zod");
const AppError_1 = require("../../../shared/errors/AppError");
const cnpjSchema = zod_1.z
    .string()
    .min(14, "CNPJ must have 14 characters")
    .nonempty("CNPJ is required");
function validateCNPJ(cnpj) {
    const result = cnpjSchema.safeParse(cnpj);
    if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "Invalid CNPJ";
        throw new AppError_1.AppError(errorMessage, 400);
    }
    return result.data;
}
