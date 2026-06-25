import dayjs from "dayjs";
import { CreateChat } from "./chat.validaton"


export const createChatService= async(username:string,validatedData:CreateChat)=>{
    const created_at=dayjs().format('YYYY-MM-DD-HH-mm');
    if(validatedData.targetUsername=='group'){
        const roomId='group';
        return {roomId,created_at}
    }
    const roomId= `chat_${[username,validatedData.targetUsername].sort().join('_')}`;
    console.log(roomId);
    return {roomId,created_at}
}