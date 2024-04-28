import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from 'cookie-parser';
dotenv.config()
import postRoute from  './routes/post.route.js'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
  };

mongoose.connect(process.env.mongo).then(() => {
    console.log("mongo db  is connected")
}).catch((err) => {
    console.log(err)
})
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
    console.log("server is runnignc  on port 3000!!");
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRouter)
app.use('/api/post',postRoute)


app.use((err,req,res,next)=>{
   const statusCode=err.statusCode || 500;
   const message=err.message || 'Internal Server Error';
   res.status(statusCode).json({
    success:false,
    statusCode,
    message
   })
})