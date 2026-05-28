import { ConflictError } from "../../errors/ConflictError";
import { Unauthorized } from "../../errors/Unauthorized";
import { addUserRepo, fetchUserRepo, storeTokenHashRepo } from "./auth.repository";
import { bcryptCompare, bcryptHash, createAccessToken, genCryptoHash, shaHash } from "./auth.util";

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
        const user = await fetchUserRepo(username);
        if(!user){
            throw new Unauthorized();
        }
         if(!user.active){
            throw new Unauthorized();
        }
        const isValid = await bcryptCompare(password, user.password);
        if (!isValid ) {
            throw new Unauthorized();
        }
        const accessToken = createAccessToken(user.id, user.role);
        const refreshToken = genCryptoHash();
        const refreshTokenHash = shaHash(refreshToken);
        await storeTokenHashRepo(refreshTokenHash, user.id);
        return { refreshToken: refreshToken, accessToken: accessToken, username: user.username }
}