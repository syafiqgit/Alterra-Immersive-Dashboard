import * as zod from "zod"

const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export const UserSchema = zod.object({
    fullname: zod.string().min(1, { message: "Fullname is required" }),
    email: zod.string().min(1, { message: "Email is required" }).email({ message: "Email format is invalid" }),
    password: zod.string().min(1, { message: 'Password is required' })
        .regex(passwordValidation, {
            message: 'Your password must be min 8 characters, one uppercase, one lowercase, one number, and one special characters',
        }),
    address: zod.string().min(1, { message: "Address is required" }),
    phone_number: zod.coerce.number().min(1, { message: "Phone number is required" }),
    team: zod.string().min(1, { message: "Team is required" }),
    status: zod.string().min(1, { message: "Team is required" }),
    role: zod.string().min(1, { message: "Team is required" })
})

export const EditUserSchema = zod.object({
    fullname: zod.string().min(1, { message: "Fullname is required" }),
    email: zod.string().min(1, { message: "Email is required" }).email({ message: "Email format is invalid" }),
    address: zod.string().min(1, { message: "Address is required" }),
    phone_number: zod.coerce.number().min(1, { message: "Phone number is required" }),
    team: zod.string().min(1, { message: "Team is required" }),
    status: zod.string().min(1, { message: "Team is required" }),
    role: zod.string().min(1, { message: "Team is required" })
})