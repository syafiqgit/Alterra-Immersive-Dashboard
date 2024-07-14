import express from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { LoginValidation } from "../middlewares/auth.validation.js";

const authRouter = express.Router()

authRouter.post("/login", LoginValidation, login)
authRouter.get("/logout", logout)

export default authRouter