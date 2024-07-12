import * as zod from "zod"

const LoginSchema = zod.object({
    email: zod.string().min(1, { message: "Email is required" }).email({ message: "Format email is invalid" }),
    password: zod.string().min(1, { message: "Password is required" })
})

export default LoginSchema