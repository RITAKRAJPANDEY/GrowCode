import { NextRequest, NextResponse } from "next/server";
import { addTaskController, getTaskController } from "../../../modules/task/task.controller"

export const POST =async(req:NextRequest):Promise<NextResponse>=>{
    return addTaskController(req);
}

export const GET = async(req:NextRequest):Promise<NextResponse>=>{
    return getTaskController(req);
}