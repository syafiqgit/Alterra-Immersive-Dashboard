import { validateInput } from "./validationErros.js";
import { body } from "express-validator"

export const LoginValidation = validateInput([
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email format is invalid"),
    body("password").notEmpty().withMessage("Password is required")
])