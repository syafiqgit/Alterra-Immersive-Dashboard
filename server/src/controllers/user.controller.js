import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import { NotFoundError } from "../utils/customErrors.js"


export const getProfileUser = asyncHandler(async (req, res) => {
    const { user_id } = req.user
    const user = await User.findById(user_id).select("-password")
    if (!user) throw new NotFoundError("User not found ")
    res.status(200).json({
        message: "Get profile user successfull",
        data: user
    })
})