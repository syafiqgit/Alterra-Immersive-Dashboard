import User from "../models/user.model.js"
import asyncHandler from "express-async-handler"
import { BadRequestError } from "../utils/customErrors.js"
import { comparePassword } from "../utils/password.js"
import { createToken } from "../utils/token.js"

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    const isValidUser = user && await comparePassword(password, user.password)
    if (!isValidUser) throw new BadRequestError("Invalid email or password")
    const token = createToken({ user_id: user._id, role: user.role })
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
        maxAge: new Date(Date.now() + oneDay),
        httpOnly: true,
        secure: true
    })
    res.status(201).json({
        message: "Login successfull"
    })
})