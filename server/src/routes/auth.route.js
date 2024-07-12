import express from "express";
import { login } from "../controllers/auth.controller.js";
import { LoginValidation } from "../middlewares/auth.validation.js";

const authRouter = express.Router()

authRouter.use("/login", LoginValidation, login)

export default authRouter