import express from "express"
import { getProfileUser } from "../controllers/user.controller.js"

const userRouter = express.Router()

userRouter.get("/profile", getProfileUser)

export default userRouter