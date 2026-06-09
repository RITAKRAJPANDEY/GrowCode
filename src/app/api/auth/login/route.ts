import { NextRequest, NextResponse } from "next/server";
import { loginController } from "../../../../modules/auth/auth.controller"

export const POST=async(req:NextRequest):Promise<NextResponse>=>{
return loginController(req);
}