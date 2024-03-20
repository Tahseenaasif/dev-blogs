import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.mongo).then(() => {
    console.log("mongo db  is connected")
}).catch((err) => {
    console.log(err)
})
const app = express();
app.listen(3000, () => {
    console.log("server is runnignc  on port 3000!!");
})

