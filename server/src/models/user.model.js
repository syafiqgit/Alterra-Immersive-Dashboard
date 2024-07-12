import mongoose from "mongoose";
import { RoleType, StatusType, TeamType } from "../utils/constant.js";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true,
        enum: Object.values(TeamType),
        default: TeamType.people
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(StatusType),
        default: StatusType.active
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(RoleType),
        default: RoleType.user
    },
    avatar: String,
    avatar_public_id: String
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

export default User