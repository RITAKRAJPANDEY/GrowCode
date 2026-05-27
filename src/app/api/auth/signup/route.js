import { signUpController } from "../../../../modules/auth/auth.controller";
export const POST=async(req)=>{
    return await signUpController(req);
}