import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import { BadRequestError, NotFoundError } from "../utils/customErrors.js"
import { StatusCodes } from "http-status-codes"
import { HashingPassword } from "../utils/password.js"


export const getProfileUser = asyncHandler(async (req, res) => {
    const { user_id } = req.user
    const user = await User.findById(user_id).select("-password")
    if (!user) throw new NotFoundError("User not found ")
    res.status(StatusCodes.ACCEPTED).json({
        message: "Get profile user successfull",
        data: user
    })
})

export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).select("-password")
    if (!user) throw new NotFoundError("User not found ")
    res.status(StatusCodes.ACCEPTED).json({
        message: "Get user by id successfull",
        data: user
    })
})

export const createUser = asyncHandler(async (req, res) => {
    const payload = req.body
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(payload.password)) {
        throw new BadRequestError("Password must be 8 characters, one uppercase, one lowercase, and one special characters")
    } else {
        payload.password = await HashingPassword(payload.password)
    }
    const user = await User.create(payload)
    res.status(StatusCodes.ACCEPTED).json({ message: "Create user successfull", data: user })
})

export const getAllUsers = asyncHandler(async (req, res) => {
    const { user_id } = req.user
    const { search, team, role, status, sort } = req.query
    const queryObject = { _id: { $ne: user_id } };
    if (search) {
        queryObject.$or = [
            { fullname: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { address: { $regex: search, $options: "i" } },
            { phone_number: { $regex: search, $options: "i" } },
        ]
    }

    if (team && team !== "All") {
        queryObject.team = team
    }

    if (role && role !== "All") {
        queryObject.role = role
    }


    if (status && status !== "All") {
        queryObject.team = status
    }

    const sortOptions = {
        Newest: '-createdAt',
        Oldest: 'createdAt',
        'A-Z': 'position',
        'Z-A': '-position',
    };
    const sortKey = sortOptions[sort] || sortOptions.Newest;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments()
    const totalPages = Math.ceil(totalUsers / limit);
    const users = await User.find(queryObject).sort(sortKey).skip(skip).limit(limit).select("-password")
    res.status(StatusCodes.ACCEPTED).json({
        message: "Get all users successfull",
        data: {
            total_users: totalUsers,
            total_pages: totalPages,
            current_page: page,
            users: users
        }
    })
})

export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(StatusCodes.ACCEPTED).json({
        message: "User updated successfully",
    });
})

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(id)
    const user = await User.findByIdAndDelete(id)
    if (!user) throw new NotFoundError("User not found")
    res.status(StatusCodes.ACCEPTED).json({
        message: "Delete user successfull"
    })
})