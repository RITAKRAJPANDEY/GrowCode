import { loginController } from "../../../../modules/auth/auth.controller"

export const POST=async(req)=>{
return loginController(req);
}