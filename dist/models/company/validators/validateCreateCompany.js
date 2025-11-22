"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateCompany = validateCreateCompany;
const zod_1 = require("zod");
const AppError_1 = require("../../../shared/errors/AppError");
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().nonempty("Street is required"),
    number: zod_1.z.string().nonempty("Number is required"),
    city: zod_1.z.string().nonempty("City is required"),
    zipcode: zod_1.z.string().nonempty("Zipcode is required"),
    state: zod_1.z.string().nonempty("State is required"),
});
const createCompanySchema = zod_1.z.object({
    name: zod_1.z.string().nonempty("Company name is required"),
    cnpj: zod_1.z.string().nonempty("CNPJ is required"),
    email: zod_1.z.string().email("Invalid email").optional(),
    phone: zod_1.z.string().optional(),
    address: addressSchema.required(),
});
function validateCreateCompany(input) {
    const result = createCompanySchema.safeParse(input);
    if (!result.success) {
        const errorMessage = result.error.erros[0]?.message || "Invalid data";
        throw new AppError_1.AppError(errorMessage, 400);
    }
    return result.data;
}
