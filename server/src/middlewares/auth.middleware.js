import { UnauthenticatedError } from "../utils/customErrors.js";
import { verifyToken } from "../utils/token.js";

export const authenticatedUser = (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        throw new UnauthenticatedError("Authenticated first")
    }
    const { user_id, role } = verifyToken(token)
    req.user = { user_id, role }
    next()
}
