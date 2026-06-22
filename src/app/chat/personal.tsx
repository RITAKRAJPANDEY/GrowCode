import { useMemo, useState } from "react";
import {io} from 'socket.io-client'
export default function Chat(){
    const [loading,setLoading]=useState<boolean>(false);
    const [username,setUsername]=useState<string|null>("");
    const [roomId,setRoomId]=useState<string|null>("");
    const [showChat,setShowChat]=useState<boolean>(false);
    const socket = useMemo(()=>io(`http://localhost:3001`),[]);
    const handleJoin = async()=>{
        if(username!==""&&roomId!==""){
            socket.emit('join_room',roomId);
            setLoading(true);
        
        setTimeout(() => {
            setShowChat(true);
            setLoading(false);
        }, 4000);
    }else{
        console.log(`Please enter roomId and username`)
    }
    }

}