import { z } from "zod";
import { CreateCompanyDTO } from "../dtos/CreateCompanyDTO";
import { AppError } from "../../../shared/errors/AppError";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  number: z.string().min(1, "Number is required"),
  city: z.string().min(1, "City is required"),
  zipcode: z.string().min(1, "Zipcode is required"),
  state: z.string().min(1, "State is required"),
});

const createCompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  cnpj: z.string().min(1, "CNPJ is required"),
  email: z.email("Invalid email").optional(),
  phone: z.string().optional(),
  address: addressSchema.required(),
});

export function validateCreateCompany(input: any): CreateCompanyDTO {
  const result = createCompanySchema.safeParse(input);
  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || "Invalid data";
    throw new AppError(errorMessage, 400);
  }
  return result.data;
}
