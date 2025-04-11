import User from "../models/Users.js";
 import bcrypt from "bcryptjs"
 import jwt from "jsonwebtoken"

 //user registration
 export const userregister=async(req,res)=>{
    const {username ,email,password}=req.body;
    try{

        //check if user already exist with email
        const userexist =await User.findOne({email});
        if(userexist){
            return res.status(400).json({
                success:false,
                message:"email already exists"
            })
        }
        //hashed password to encrypt
        const hashedpassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            username,
            email,
            password:hashedpassword
        });
        const token=jwt.sign({
            id:newUser._id
        },process.env.JWT_SECRET_KEY,{expiresIn:`7d`})
        res.status(200).json({
            success:true,
            message:"User created sucessfully",
            token

        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message,

        })

    }
    
 }
 export const userlogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Invalid user"
            })
        }
        const ispassword=await bcrypt.compare(password,user.password);
        if(!ispassword){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })

        }
        const token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET_KEY,{expiresIn:`7d`})
        res.status(200).json({
            success:true,
            message:"login success",
            token,
            user

        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:e.message,

        })

    }
 }
 