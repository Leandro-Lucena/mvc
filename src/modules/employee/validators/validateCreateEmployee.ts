import { z } from "zod";
import { CreateEmployeeDTO } from "../dtos/CreateEmployeeDTO";
import { AppError } from "../../../shared/errors/AppError";

const createEmployeeSchema = z.object({
  name: z.string().nonempty("Name is required"),
  cpf: z.string().nonempty("CPF is required"),
  email: z.email("Invalid email"),
  position: z.string().nonempty("Position is required"),
  salary: z.number().nonnegative("Salary must be greater than 0"),
  companyId: z.uuid().nonempty("Company id is required"),
});

export async function validateCreateEmployee(
  input: any
): Promise<CreateEmployeeDTO> {
  const result = createEmployeeSchema.safeParse(input);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message || "Invalid input";
    throw new AppError(errorMessage, 400);
  }
  return result.data;
}
