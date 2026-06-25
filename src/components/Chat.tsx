'use client';

import { useChatStore } from "@/src/store";
import { useEffect, useRef, useState } from "react";


interface MessagePayload {
    message: string;
    roomId: string;
    senderId: string;
}
export default function Chat() {
    const sendMessage = useChatStore((state) => state.sendMessage);
    const socket = useChatStore((state) => state.socket);
    const joinRoom = useChatStore((state) => state.joinRoom);
    const isConnected = useChatStore((state) => state.isConnected);
    const chatEndRef = useRef<HTMLDivElement>(null)
    const [message, setMessage] = useState<MessagePayload[]>([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {

        // const fetchRoomId = async()=>{
        //     try{
        //          const data =await fcreateChatservice('group');
        //          const roomId=data.roomId;
        //          alert(roomId);
        //          if(isConnected&&roomId){
        //          joinRoom(roomId)
        //           }
        //     }catch(err:unknown){
        //         console.log('unable to fetch the roomId',err)
        //     }
        //     fetchRoomId()
        // 

        if (isConnected) {
            joinRoom('group');
        }
    }, [isConnected, joinRoom]);

    useEffect(() => {
        if (!socket) return;
        const handleIncomingMessage = (data: MessagePayload) => {
            setMessage((prev) => [...prev, data]);
        };
        socket.on('receive_message', handleIncomingMessage);

        return () => {
            socket.off('receive_message', handleIncomingMessage);
        }
    }, [socket]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    });
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        if(!inputMessage.trim())return;
        const newPayload={roomId:'group',message:inputMessage,senderId:'me'}
        sendMessage(newPayload);
        setMessage((prev)=>[...prev,newPayload])
        setInputMessage('');
    }
return (
  /* Root Wrapper: Kept your structural padding and flex properties intact */
  <div className="flex flex-col h-full w-full px-6 justify-start bg-slate-950 text-white">
    
    {/* Header */}
    <div className="flex-none border-b border-slate-800/60 pb-2">
      <h1 className="text-5xl my-5 font-bold text-green-300">WinterBreakers</h1>
    </div>

    {/* Message Feed Box: Gave individual bubbles full opacity solid colors so they pop */}
    <div className="flex-1 overflow-y-auto space-y-4 my-4 pr-2 flex flex-col min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {message.map((msg, idx) => (
        <div 
          key={idx} 
          className={`p-3 rounded-xl max-w-[75%] break-words shadow-sm ${
            msg.senderId === 'me' 
              ? 'bg-blue-600 text-white ml-auto rounded-tr-none' 
              : 'bg-slate-800 text-slate-100 mr-auto rounded-tl-none' 
          }`} 
        >
          <p className="text-sm font-medium leading-relaxed">{msg.message}</p>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>

    {/* Footer Form: Clean horizontal grouping matching your exact input layout */}
    <form onSubmit={handleSubmit} className="flex gap-3 pb-6 flex-none items-center">
      <input 
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type Your Message..."
        className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all text-sm min-w-0 placeholder-slate-500" 
      />
      <button
        type="submit"
        disabled={!isConnected}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl transition-colors font-semibold text-sm flex-none h-full"
      >
        send
      </button>
    </form>
  </div>
  );
}