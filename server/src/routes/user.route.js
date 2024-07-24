import express from "express"
import { createUser, deleteUser, getAllUsers, getProfileUser, getUserById, updateUser } from "../controllers/user.controller.js"
import { UpdateUserValidation, UserValidation } from "../middlewares/user.validation.js"
import { validationIdParam } from "../middlewares/validationIdParam.js"

const userRouter = express.Router()

userRouter.post("/create-user", UserValidation, createUser)
userRouter.get("/profile", getProfileUser)
userRouter.get("/", getAllUsers)
userRouter.get("/:id", validationIdParam, getUserById)
userRouter.delete("/delete-user/:id", validationIdParam, deleteUser)
userRouter.patch("/update-user/:id", UpdateUserValidation, validationIdParam, updateUser)

export default userRouter