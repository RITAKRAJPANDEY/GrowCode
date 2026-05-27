import bcrypt from "bcrypt";
export const bcryptHash = async(data)=>{
    return await bcrypt.hash(data,10);
}
export const bcryptCompare = async(password,hashed_password)=>{
    return await bcrypt.compare(password,hashed_password);
}
