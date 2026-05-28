import { NextResponse } from "next/server";
import { logInService, signUpService} from "./auth.service"
import {  logInSchema, signUpSchema } from "./auth.validator";
import { errorHandlerMiddleware } from "../../middleware/error.handler.middleware";
import { cookies } from "next/headers";

export const signUpController=async(req)=>{
    try{
        const rawData = await req.json();
        const validatedData = signUpSchema.parse(rawData);
        const user = await signUpService(validatedData);
        return NextResponse.json({
        success:true,
        created_at:user.created_at,
        username:user.username,
    },{
        status:201
    });
    }catch(err){
        console.error(err);
       return errorHandlerMiddleware(err);
    }
}
export const loginController = async (req)=>{
    try{
        const rawData = await req.json();
        const validatedData=logInSchema.parse(rawData);
        const user = await logInService(validatedData);
        const cookieStore = await cookies();
        cookieStore.set('refreshToken',user.refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
            path:'/',
            maxAge:60*60*24*32
        });
        
        return NextResponse.json({
            success:true,
            username:user.username,
            accessToken:user.accessToken
        });
        
    }catch(err){
       return errorHandlerMiddleware(err);
    }

}