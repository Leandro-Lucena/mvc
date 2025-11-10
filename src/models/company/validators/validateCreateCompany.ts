import { z } from "zod";
import { CreateCompanyDTO } from "../dtos/CreateCompanyDTO";
import { AppError } from "../../../shared/errors/AppError";

const addressSchema = z.object({
  street: z.string().nonempty("Street is required"),
  number: z.string().nonempty("Number is required"),
  city: z.string().nonempty("City is required"),
  zipcode: z.string().nonempty("Zipcode is required"),
  state: z.string().nonempty("State is required"),
});

const createCompanySchema = z.object({
  name: z.string().nonempty("Company name is required"),
  cnpj: z.string().nonempty("CNPJ is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  address: addressSchema.required(),
});

export function validateCreateCompany(input: any): CreateCompanyDTO {
  const result = createCompanySchema.safeParse(input);
  if (!result.success) {
    const errorMessage = result.error.erros[0]?.message || "Invalid data";
    throw new AppError(errorMessage, 400);
  }
  return result.data;
}
