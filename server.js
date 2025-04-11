import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { ConnectToDb } from "./config/db.js";
import authroutes from "./routes/authroutes.js"
import resumeroutes from "./routes/ResumeRoutes.js";

dotenv.config();

const app=express();
ConnectToDb();


app.use(cors());
app.use(express.json());

//routes
app.use('/auth',authroutes);
app.use('/resume',resumeroutes);


const PORT=dotenv.PORT||3000
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} port`)
})