import jwt from "jsonwebtoken"

export const authMiddleware=(req,res,next)=>{
    const authheader=req.headers.authorization;

    if(!authheader || !authheader.startsWith('Bearer')){
        return res.status(401).json({
            message:"no token found"
        })
    }
     

    const token =authheader.split(' ')[1];
    try{
        const decodedtoken=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decodedtoken.id;
        next();
    }catch(err){
        res.status(400).json({
            message:"invalid token"
        })
    }
}