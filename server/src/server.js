import "express-async-error"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import morgan from "morgan"
import mongoose from "mongoose"
dotenv.config()

if (process.env.NODE === "development") {
    app.use(morgan())
}
const app = express()
const port = process.env.PORT
const mongodbUrl = process.env.MONGODB_URL

app.use(cors({
    origin: "http://localhost:5173/",
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(mongoSanitize())
app.use(helmet())

mongoose.connect(mongodbUrl).then(() => console.log("Connected to mongodb")).catch((error) => console.log("Connection error", error))
app.listen(port, () => console.log(`Server running on port ${port}`))