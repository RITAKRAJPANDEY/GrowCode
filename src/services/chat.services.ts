import { apiClient } from "./apiClient"

export const fcreateChatservice=async(targetUsername:string)=>{
    try{
        const res = await apiClient.post('/chat/',targetUsername);
        return res.data;
    }catch(err:unknown){
        throw err;
    }
}