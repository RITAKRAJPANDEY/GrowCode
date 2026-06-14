import { getTaskController } from "@/src/modules/task/task.controller";
import { NextRequest } from "next/server";
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