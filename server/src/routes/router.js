import express from "express"
import authRouter from "./auth.route.js"

const Router = express.Router()

Router.use("/api/v1/auth", authRouter)

export default Router