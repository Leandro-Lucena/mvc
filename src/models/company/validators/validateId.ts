import { z } from "zod";
import { AppError } from "../../../shared/errors/AppError";

const idSchema = z.string().uuid("Invalid ID");

export function validateId(id: any): string {
  const result = idSchema.safeParse(id);

  if (!result.success) {
    const errorMessage = result.error.issues[0]?.message || "Invalid ID";
    throw new AppError(errorMessage, 400);
  }

  return result.data;
}
