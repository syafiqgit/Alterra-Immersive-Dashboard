import { validateInput } from "./validationErros.js";
import { param } from "express-validator"
import mongoose from "mongoose";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../utils/customErrors.js";
import User from "../models/user.model.js";
import { RoleType } from "../utils/constant.js";

export const validationIdParam = validateInput([
    param("id").custom(async (value, { req }) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value)
        if (!isValidId) throw new BadRequestError("Invalid MongoDB Id")
        const user = await User.findById(value)
        if (!user) throw new NotFoundError("No user found")
    })
])