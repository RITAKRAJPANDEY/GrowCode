import { errorHandlerMiddleware } from "@/src/middleware/error.handler.middleware";
import { NextRequest, NextResponse } from "next/server";
import { createChatSchema } from "./chat.validaton";
import { createChatService } from "./chat.services";
import { Unauthorized } from "@/src/errors/Unauthorized";

export const  createChatController= async(req:NextRequest):Promise<NextResponse>=>{
 try{
    const rawData = await req.json();
    const validatedData = createChatSchema.parse(rawData);//has the targetUsername
    const username = req.headers.get('x-username')||null;// username of the user from the headers
    const userId = req.headers.get('x-user-id')||null;
    if(!username||!userId){
      throw new Unauthorized();
    }
    const chat = await createChatService(username,validatedData);
    return NextResponse.json({
      success:true,
      username:username,
      roomId:chat.roomId,
      created_at:chat.created_at
    });
    
 }catch(err){
    return errorHandlerMiddleware(err);
 }
}