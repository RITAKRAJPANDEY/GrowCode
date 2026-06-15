import { NextRequest, NextResponse } from "next/server";
import { addTaskController, allTaskDataController } from "../../../modules/task/task.controller"
import { QueryParams } from "@/src/modules/task/task.validator";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    return await addTaskController(req);
}
export const GET = async (req: NextRequest): Promise<NextResponse> => {
   
    return allTaskDataController(req)
}