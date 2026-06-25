import { fcreateChatservice } from "@/src/services/chat.services";
import { useChatStore } from "@/src/store";
import { useEffect, useState } from "react";

interface MessagePayload{
    message:string;
    roomId:string;
    senderId:string;
}
export default function  ChatPage() {
    const sendMessage=useChatStore((state)=>state.sendMessage);
    const socket = useChatStore((state)=>state.socket);
    const joinRoom=useChatStore((state)=>state.joinRoom);
    const isConnected=useChatStore((state)=>state.isConnected);

    const [chatMessage,setChatMessage]=useState<MessagePayload[]>([]);
    const [message,setMessage]=useState('');

    useEffect(()=>{
        let roomId;
        const fetchRoomId = async()=>{
            const data =await fcreateChatservice('group');
            roomId=data.roomId;
        }
        if(isConnected&&roomId){
            joinRoom(roomId)
        }
    },[isConnected,joinRoom]);


    
}