import { NextRequest, NextResponse } from "next/server";
import { refreshTokenController } from "../../../../modules/auth/auth.controller"

export const POST = async(req:NextRequest):Promise<NextResponse>=>{
    return refreshTokenController(req);
}