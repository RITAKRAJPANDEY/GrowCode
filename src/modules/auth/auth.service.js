import { ConflictError } from "../../errors/ConflictError";
import { Unauthorized } from "../../errors/Unauthorized";
import { addNewRefreshTokenRepo, addUserRepo, fetchUserIdRepo, fetchUserRepo, getRefreshTokenRepo, revokeAllRefreshTokens, revokeToken, storeTokenHashRepo } from "./auth.repository";
import { bcryptCompare, bcryptHash, createAccessToken, genCryptoHash, shaHash } from "./auth.util";

export const signUpService = async ({ username, password, email }) => {
    try {
        const hashed_password = await bcryptHash(password);
        
        const user = await addUserRepo(username, hashed_password,email);
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
export const refreshTokenService=async({refreshToken})=>{
   
    const user = await getRefreshTokenRepo(shaHash(refreshToken));
    if(!user){
        throw new Unauthorized(); 
    }
    if(user.is_revoked||new Date(user.expires_at).getTime()<Date.now()){
        await revokeAllRefreshTokens(user.user_id)
        throw new Unauthorized();
    }
    // generate new access and refresh token and send it to the user also revoke this refresh token (make it atomic) and store the new refreshtoken  catch db error if unable to do so and throw db error 
    const userId = await fetchUserIdRepo(user.user_id);
    const newAccessToken = createAccessToken(user.user_id,userId.role);
    const newRefreshToken = genCryptoHash();
    const tokenHash=shaHash(newRefreshToken);
   const token= await addNewRefreshTokenRepo(tokenHash,user.user_id,shaHash(refreshToken));//newtoken,userid,oldtoken
    return {accessToken:newAccessToken,refreshToken:newRefreshToken,created_at:token.created_at}

    
}
export const logOutUserService = async({refreshToken})=>{//order of checks matter as if date is checked with the user not found then hacker trying an old token will see unauthorized and the second if statement won't be able to revoke all the tokens , as for a old token if is_revoked is true then it should revoke all tokens
    const hashedToken = shaHash(refreshToken);
    const user = await getRefreshTokenRepo(hashedToken);
    if(!user){
        throw new Unauthorized(); 
    }
    if(user.is_revoked){
        await revokeAllRefreshTokens(user.user_id)
        throw new Unauthorized();
    }
     if(new Date(user.expires_at).getTime()< Date.now()){
        throw new Unauthorized(); 
    }

    await revokeToken(hashedToken);
    
}