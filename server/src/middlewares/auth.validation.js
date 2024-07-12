import { validateInput } from "./validationErros.js";
import { body } from "express-validator"

export const LoginValidation = validateInput([
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required")
])