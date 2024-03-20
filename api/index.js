import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
dotenv.config()
mongoose.connect(process.env.mongo).then(() => {
    console.log("mongo db  is connected")
}).catch((err) => {
    console.log(err)
})
const app = express();
app.use(express.json())
app.listen(3000, () => {
    console.log("server is runnignc  on port 3000!!");
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRouter)
