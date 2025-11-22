import { z } from "zod";
import { AppError } from "../../../shared/errors/AppError";
import { UpdateEmployeeDTO } from "../dtos/UpdateEmpolyeeDTO";

const updateEmployeeSchema = z.object({
  position: z.string().nonempty("Position is required"),
  salary: z.number().nonnegative("Salary must be greater than 0"),
});

export async function validateUpdateEmployee(
  input: any
): Promise<UpdateEmployeeDTO> {
  const result = updateEmployeeSchema.safeParse(input);

  if (!result.success) {
    const errorMessage = result.error.issues[0].message || "Invalid input";
    throw new AppError(errorMessage, 400);
  }
  return result.data;
}
