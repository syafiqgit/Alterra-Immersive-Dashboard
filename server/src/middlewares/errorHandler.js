import { StatusCodes } from "http-status-codes";

export const errorHandler = (err, _req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const messageError = err.message || "Internal server error"
    res.status(statusCode).json({ message: messageError })
}   