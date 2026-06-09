import { NextRequest, NextResponse } from "next/server";
import { signUpController } from "../../../../modules/auth/auth.controller";
export const POST=async(req:NextRequest):Promise<NextResponse>=>{
    return await signUpController(req);
}