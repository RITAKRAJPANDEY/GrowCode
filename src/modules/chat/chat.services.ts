import dayjs from "dayjs";
import { CreateChat } from "./chat.validaton"

export const createChatService= async(username:string,validatedData:CreateChat)=>{
    const roomId= `chat_${[username,validatedData.targetUsername].sort().join('_')}`;
    console.log(roomId);
    const created_at=dayjs().format('YYYY-MM-DD-HH-mm')
    return {roomId,created_at}
}