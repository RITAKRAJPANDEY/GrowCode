import { NextResponse } from "next/server"
import { AppError } from "../errors/AppError"
import { ZodError } from "zod";
export const errorHandlerMiddleware=(error)=>{
    if(error instanceof ZodError){
        const formattedErrors = error.errors.map((err)=>({
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
    if(error instanceof AppError){
        return NextResponse.json({
            success:false,
            message:error.message,
            error:error.errors||null
        },{
            status:error.statuscode
        })
    }else{
        return NextResponse.json({
            success:false,
            message:"server Error"
        },{
            status:500
        });
    }
}