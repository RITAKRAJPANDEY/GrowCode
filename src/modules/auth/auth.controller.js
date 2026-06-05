import { NextResponse } from "next/server";
import { logInService, logOutUserService, refreshTokenService, signUpService} from "./auth.service"
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
       return errorHandlerMiddleware(err);
    }
}
export const loginController = async (req)=>{
    try{
        const rawData = await req.json();
        const validatedData=logInSchema.parse(rawData);
        const user = await logInService(validatedData);
      
        
        const response = NextResponse.json({
            success:true,
            username:user.username,
            accessToken:user.accessToken
        },{status:200});
        response.cookies.set('refreshToken',user.refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
            path:'/',
            maxAge:60*60*24*32
        });
        return response;
        
    }catch(err){
       return errorHandlerMiddleware(err);
    }

}
export const refreshTokenController = async () => {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;

        if (!refreshToken) {
            return NextResponse.json({
                success: false,
                message: 'Refresh token missing',
            }, { status: 401 });
        }

        const user = await refreshTokenService({ refreshToken });

        const response = NextResponse.json({
            success: true,
            accessToken: user.accessToken,
            created_at: user.created_at,
        }, { status: 200 });

        response.cookies.set('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 32,
        });
        return response;
    } catch (err) {
        return errorHandlerMiddleware(err);
    }
};
export const logOutController=async()=>{
    try{
        const cookieStore = await cookies();
        const refreshToken=cookieStore.get("refreshToken")?.value;
        if(refreshToken){
            try{
                 await logOutUserService({refreshToken});
            }catch(err){
                console.error(err);
                console.warn("Token reocation skipped / failed ");
            }
           
        }
        cookieStore.set("refreshToken","",{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
            path:'/',
            expires:new Date(0)
        })
  
    return NextResponse.json({
        success: true,
        message: "logged out successfully"
    },{status:200});
    }catch(err){
        return errorHandlerMiddleware(err);
    }
}