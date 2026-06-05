import { NextResponse } from "next/server";
import { errorHandlerMiddleware } from "../../middleware/error.handler.middleware";
import { addTaskService } from "./task.service";
import { taskValidatorSchema } from "./task.validator";

export const addTaskController=async(req)=>{
    try{
        const rawData = await req.json();
        const validatedData = taskValidatorSchema.parse(rawData);
        const userId = req.headers.get('x-user-id');
        const task = await addTaskService({validatedData,userId});

        return NextResponse.json({
            success:true,
            created_at:task.created_at,
            id:task.id
        });
    }catch(err){
        return errorHandlerMiddleware(err);
    }
}
export const getTaskController= async(req)=>{//date and user_id
    const rawData = req.json();
    const userId = req.headers.get('x-user-id');
    
    
}