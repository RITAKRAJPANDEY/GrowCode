import { createChatController } from "@/src/modules/chat/chat.controller";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest):Promise<NextResponse>=>{
    console.log(req);
    return await createChatController(req);
}