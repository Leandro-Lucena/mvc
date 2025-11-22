import { z } from "zod";
import { AppError } from "../../../shared/errors/AppError";

const cnpjSchema = z
  .string()
  .min(14, "CNPJ must have 14 characters")
  .nonempty("CNPJ is required");

export function validateCNPJ(cnpj: any): string {
  const result = cnpjSchema.safeParse(cnpj);

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || "Invalid CNPJ";
    throw new AppError(errorMessage, 400);
  }

  return result.data;
}
