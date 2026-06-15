import { NextResponse,NextRequest } from "next/server";
import { errorHandlerMiddleware } from "../../middleware/error.handler.middleware";
import { addTaskService, allTaskDataService, getTaskService } from "./task.service";
import { getTaskValidatorSchema, QueryParams, queryValidationSchema, taskValidatorSchema } from "./task.validator";

export const addTaskController=async(req:NextRequest):Promise<NextResponse>=>{
    try{
        const rawData = await req.json();
        const validatedData = taskValidatorSchema.parse(rawData);
        const userId = req.headers.get('x-user-id')||"";
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


export const getTaskController= async(req:NextRequest,date:Date):Promise<NextResponse>=>{//date and user_id
    try{
        const userId = req.headers.get('x-user-id')||"";
        const validatedData = getTaskValidatorSchema.parse({date});
        const task = await getTaskService({validatedData:validatedData.date,userId});
        
        return NextResponse.json({
            success:true,
            task:task.task,
        });
    }catch(err){
        return errorHandlerMiddleware(err)
    }    
}

export const allTaskDataController=async(req:NextRequest,queryParams:QueryParams):Promise<NextResponse>=>{
try{
    const userId=req.headers.get('x-user-id')||"";
    const validatedQueryParams = queryValidationSchema.parse(queryParams);
     const data = await allTaskDataService(validatedQueryParams,userId)
    return NextResponse.json({
        success:true,
        data:data
    })
}catch(err:unknown){
    return errorHandlerMiddleware(err)
}
}