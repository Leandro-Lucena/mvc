import { z } from "zod";
import { UpdateCompanyDTO } from "../dtos/UpdateCompanyDTO";
import { AppError } from "../../../shared/errors/AppError";

const addressSchema = z.object({
  street: z.string().optional(),
  number: z.string().optional(),
  city: z.string().optional(),
  zipcode: z.string().optional(),
  state: z.string().optional(),
});

const updateCompanySchema = z.object({
  email: z.email("Invalid email").optional(),
  phone: z.string().optional(),
  address: addressSchema.optional(),
});

export function validateUpdateCompany(input: any): UpdateCompanyDTO {
  const result = updateCompanySchema.safeParse(input);

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || "Invalid data";
    throw new AppError(errorMessage, 400);
  }

  return result.data;
}
