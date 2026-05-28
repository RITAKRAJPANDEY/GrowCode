import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
export const bcryptHash = async(data)=>{
    return await bcrypt.hash(data,10);
}
export const bcryptCompare = async(password,hashed_password)=>{
    return await bcrypt.compare(password,hashed_password);
}
export const createAccessToken=(id,role)=>{
    return jwt.sign({sub:id,role:role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
}
export const validateAccessToken=(token)=>{
    try{
         return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    }catch(err){
        throw err;
    }
   
}
export const genCryptoHash=()=>{
    return crypto.randomBytes(32).toString('hex');
}
export const shaHash=(data)=>{
    return crypto.createHash('sha256').update(data).digest('hex');
}