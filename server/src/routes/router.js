import express from "express"
import authRouter from "./auth.route.js"
import { authenticatedUser } from "../middlewares/auth.middleware.js"
import userRouter from "./user.route.js"

const Router = express.Router()

Router.use("/api/v1/auth", authRouter)
Router.use(authenticatedUser)
Router.use("/api/v1/user", userRouter)

export default Router