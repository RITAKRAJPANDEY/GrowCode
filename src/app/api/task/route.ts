import { NextRequest, NextResponse } from "next/server";
import { addTaskController, getTaskController } from "../../../modules/task/task.controller"

export const POST =async(req:NextRequest):Promise<NextResponse>=>{
    return await addTaskController(req);
}
