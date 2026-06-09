import { NextRequest, NextResponse } from "next/server";
import { logOutController } from "../../../../modules/auth/auth.controller"

export const POST =(req:NextRequest):Promise<NextResponse>=>{
    return logOutController(req);
}