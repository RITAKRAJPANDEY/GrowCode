import { addFeedbackController, getTaskController } from "@/src/modules/task/task.controller";
import { NextRequest, NextResponse } from "next/server";
interface ParamsData{
    params:Promise<{
         date:string
    }>
}
export const GET = async(req:NextRequest,context:ParamsData)=>{
    const {date}=await context.params;
    const parseDate=new Date(date)
return await getTaskController(req,parseDate);
}
export const  POST = async(req:NextRequest):Promise<NextResponse>=>{
    return await addFeedbackController(req);
}