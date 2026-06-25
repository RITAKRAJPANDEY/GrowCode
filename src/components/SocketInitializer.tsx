'use client';

import { ReactNode, useEffect } from "react";
import { useChatStore } from "../store";

export default function SocketInitializer({children}:{children:ReactNode}){
    const initializeSocket=useChatStore((state)=>state.initSocket);
    const disconnectSocket=useChatStore((state)=>state.disconnectSocket);

    useEffect(()=>{
        initializeSocket();
        return ()=>disconnectSocket();
    },[initializeSocket,disconnectSocket]);

    return <>{children}</>

}