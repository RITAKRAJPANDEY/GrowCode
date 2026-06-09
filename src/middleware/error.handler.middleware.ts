import {  NextResponse } from "next/server"
import { AppError } from "../errors/AppError"
import { ZodError } from "zod";
export const errorHandlerMiddleware=(error:unknown):NextResponse=>{
    if(error instanceof ZodError){
        const formattedErrors = error.issues.map((err)=>({
            field:err.path.join('.'),
            message:err.message
        }));
        return NextResponse.json({
            success:false,
            message:"validation failed",
            errors:formattedErrors
        },{
            status:400
        });
    }// new learning 
    else if(error instanceof AppError){
        return NextResponse.json({
            success:false,
            message:error.message,
            error:error.error||null
        },{
            status:error.statuscode
        })
    }else{
        const errorObj = error instanceof Error ?error:new  Error(String(error));
        console.error('Unhandled error:', errorObj.message || error, errorObj.stack || 'no stack');
        return NextResponse.json({
            success:false,
            message:"server Error"
        },{
            status:500
        });
    }
}