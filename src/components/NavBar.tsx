'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { fcreateChatservice } from "../services/chat.services";
import { io } from 'socket.io-client';

export default function Navbar() {
    const pathname = usePathname();
    const socket = useMemo(() => io('http://localhost:3001'), []);
    const [username, setUsername] = useState<string | null>("");
    const handleChat = async () => {
        const group = 'group';
        const data = await fcreateChatservice(group);
        if (data !== "") {
            setUsername(data.username);
            const roomId = data.roomId;
            socket.emit('join_room', roomId);
        }
    }

    return (
        <div className="fixed top-0 left-0 flex flex-col w-64 h-screen p-4 gap-10 bg-[#020617] text-[#f1f5f9]">


            <div className="bg-[#020617] rounded-md">
                <div className="flex flex-row   items-center justify-center">
                     <h1 className="text-3xl font-bold px-2">
                    <span className="text-[#34d399]">
                        Grow
                    </span>Code</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"/></svg>
                    
                </div>
               
            </div>
            <div >
                <div className="flex flex-col gap-4">
                    <Link
                        href="/addtask"
                        className={` ${pathname === "/addtask" ? "text-green-300 " : "text-slate-400"} flex py-2 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-xl hover:text-green-300 transition-all `}
                    >
                        Add Task
                    </Link>
                    <Link onClick={() => handleChat()}
                        href={`/feedback/${dayjs().format('YYYY-MM-DD')}`}
                        className={` ${pathname === `/feedback/${dayjs().format('YYYY-MM-DD')}` ? "text-green-300 " : "text-slate-400"} flex py-2 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-xl hover:text-green-300 transition-all `}
                    >
                        Add Feedback
                    </Link>
                </div>

                <div className="flex flex-col gap-8">

                    <div className="flex flex-col gap-2 ">
                        <div className="flex flex-row gap-2 justify bg-[#0f172a]/30 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/><path d="M21 16v2a4 4 0 0 1-4 4h-5"/></svg>
                            <h2 className="py-1 px-2 text-sm font-semibold uppercase tracking-wider text-[#34d399] rounded">
                                Chat
                            </h2>
                        </div>

                        <Link href="/chat" className={` ${pathname === "/chat" ? "text-green-300 " : "text-slate-400"} flex py-2 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-xl hover:text-green-300 transition-all `}>Group</Link>
                        {/* <Link href="/chat?username=user1" className="flex py-1.5 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-lg hover:text-white text-slate-400">user1</Link>
                    <Link href="/" className="flex py-1.5 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-lg hover:text-white text-slate-400">user2</Link> */}
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-2 bg-[#0f172a]/30 rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-6 h-6 text-white"
                            >
                                <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                                <path d="m19 9-5 5-4-4-3 3" />
                            </svg>
                            <h2 className="py-1 px-2 text-sm font-semibold uppercase tracking-wider text-[#34d399] ">
                                Statistics
                            </h2>
                        </div>

                        <Link href="/" className="flex py-1.5 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-lg hover:text-red-700 text-slate-400">Be Content</Link>
                        <Link href="/" className="flex py-1.5 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-lg hover:text-green-300 text-slate-400">Be Competent</Link>
                    </div>

                </div>
            </div>
            <div className="mt-auto pt-4 border-t rounded-md bg-[#020617]  border-[#0f172a]">

                <Link
                    href="/logout"
                    className={` ${pathname === "/logout" ? "text-red-300 " : "text-slate-400"} flex py-2 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-xl hover:text-green-300 transition-all `}>Log Out</Link>
            </div>

        </div>
    );
}