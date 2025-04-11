import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const ConnectToDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Database connection successfull")
    }catch(e){
        console.log("Database connection failed");
        process.exit(1)
        
    }
}
