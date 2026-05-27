import { ConflictError } from "../../errors/ConflictError";
import { Unauthorized } from "../../errors/Unauthorized";
import { addUserRepo, fetchUserRepo } from "./auth.repository";
import { bcryptCompare, bcryptHash } from "./auth.util";

export const signUpService = async ({ username, password, email }) => {
    try {
        const hashed_password = await bcryptHash(password);
        const hashed_email = await bcryptHash(email);
        const user = await addUserRepo(username, hashed_password, hashed_email);
        return {
            created_at: user.created_at,
            username: user.username
        };
    } catch (err) {
        if (err.code == "23505") {
            throw new ConflictError("username already exists");
        }
        throw err;
    }
}
export const logInService = async ({ username, password }) => {
try{
    const user = await fetchUserRepo(username);
    if (!user) {
        throw new Unauthorized();
    }
    if (!user.active) {
        throw new Unauthorized();
    }
    const isValid= await bcryptCompare(password,user.hashed_password);
    if(!isValid){
        throw new Unauthorized();
    }
    
}catch(err){
    throw err;
}
}