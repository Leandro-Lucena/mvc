"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = validateId;
const zod_1 = require("zod");
const AppError_1 = require("../../../shared/errors/AppError");
const idSchema = zod_1.z.string().uuid("Invalid ID");
function validateId(id) {
    const result = idSchema.safeParse(id);
    if (!result.success) {
        const errorMessage = result.error.issues[0]?.message || "Invalid ID";
        throw new AppError_1.AppError(errorMessage, 400);
    }
    return result.data;
}
