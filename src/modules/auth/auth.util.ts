import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { tokenEnv } from "./auth.validator";
export const bcryptHash = async(data:string)=>{
    return await bcrypt.hash(data,10);
}
export const bcryptCompare = async(password:string,hashed_password:string)=>{
    return await bcrypt.compare(password,hashed_password);
}
export const createAccessToken=(id:string,role:string)=>{
    return jwt.sign({sub:id,role:role},tokenEnv.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
}
export const validateAccessToken=(token:string)=>{
    try{
        const decoded =  jwt.verify(token,tokenEnv.ACCESS_TOKEN_SECRET);
        return{ valid:true,decoded}
    }catch(err:unknown){
        if((err as{name:string}).name==="TokenExpiredError"){
           return{
            valid: false, 
            code:'TOKEN_EXPIRED', 
            expiredAt: (err as {expiredAt:Date}).expiredAt
           } 
        }
        throw err;
    }
}
export const genCryptoHash=()=>{
    return crypto.randomBytes(32).toString('hex');
}
export const shaHash=(data:string)=>{
    return crypto.createHash('sha256').update(data).digest('hex');
}