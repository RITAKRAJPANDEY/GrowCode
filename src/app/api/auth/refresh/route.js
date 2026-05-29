import { refreshTokenController } from "../../../../modules/auth/auth.controller"

export const POST = async(req)=>{
    return refreshTokenController(req);
}