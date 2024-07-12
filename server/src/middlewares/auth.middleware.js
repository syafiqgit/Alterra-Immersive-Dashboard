import { UnauthenticatedError } from "../utils/customErrors";
import { verifyToken } from "../utils/token";

export const authenticatedUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        throw new UnauthenticatedError("Authenticated first")
    }
    const { user_id, role } = verifyToken(token)
    req.user = { user_id, role }
    next()
}
