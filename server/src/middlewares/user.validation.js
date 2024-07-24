import User from "../models/user.model.js";
import { RoleType, StatusType, TeamType } from "../utils/constant.js";
import { BadRequestError } from "../utils/customErrors.js";
import { validateInput } from "./validationErros.js";
import { body } from "express-validator"

export const UserValidation = validateInput([
    body("fullname").notEmpty().withMessage("Email is required"),
    body("email").notEmpty().withMessage("Password is required").isEmail().withMessage("Invalid email format").custom(async (email) => {
        const isEmailExist = await User.findOne({ email })
        if (isEmailExist) throw new BadRequestError("Email is already exist")
    }),
    body("password").notEmpty().withMessage("Password is required"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone_number").notEmpty().withMessage("Phone number is required"),
    body("status").notEmpty().withMessage("Status is required").isIn(Object.values(StatusType)).withMessage("Invalid status type"),
    body("team").notEmpty().withMessage("Status is required").isIn(Object.values(TeamType)).withMessage("Invalid team type"),
    body("role").notEmpty().withMessage("Status is required").isIn(Object.values(RoleType)).withMessage("Invalid role type")

])

export const UpdateUserValidation = validateInput([
    body("fullname").notEmpty().withMessage("Email is required"),
    body("email").notEmpty().withMessage("Password is required").isEmail().withMessage("Invalid email format"),
    body("address").notEmpty().withMessage("Address is required"),
    body("phone_number").notEmpty().withMessage("Phone number is required"),
    body("status").notEmpty().withMessage("Status is required").isIn(Object.values(StatusType)).withMessage("Invalid status type"),
    body("team").notEmpty().withMessage("Status is required").isIn(Object.values(TeamType)).withMessage("Invalid team type"),
    body("role").notEmpty().withMessage("Status is required").isIn(Object.values(RoleType)).withMessage("Invalid role type")

])
