'use client';
import Link from "next/link";
import { useTaskStore } from "../store";
import dayjs from 'dayjs';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function UtilityBar() {
    const pathname = usePathname();
    const tasks=useTaskStore((state)=>state.tasks);
    const fetchTasksByDate = useTaskStore((state)=>state.getTaskByDate)
    useEffect(()=>{
        const loadInitialData=async()=>{
        try{
            await fetchTasksByDate()
        }catch(err){
            console.log(err);
        }
    }
    loadInitialData()
    },[fetchTasksByDate])
    return (
        <div className="fixed top-0 right-0 flex flex-col w-64 h-screen p-4 gap-8 bg-[#020617] ">


            <div className="bg-[#020617] rounded-md">
                <h1 className="text-2xl text-[#f1f5f9]  px-2">
                    Tasks</h1>
            </div>
            {tasks.map((task)=>(//React can't use date as a key give either a string or an id number
                 <div key={task.id} className={`text-[#f1f5f9] flex flex-col ${dayjs(task.date).format('dddd, MMMM D')===dayjs().format('dddd, MMMM D')?"bg-orange-950/10":"bg-[#0f172a]"}  gap-2 rounded-md px-2`}>
                   
                   <Link className={` ${pathname === `/task/details/${dayjs(task.date).format('YYYY-MM-DD')}` ? "text-[#4f46e5]" : ""} hover:scale-98 ${dayjs(task.date).format('dddd, MMMM D')===dayjs().format('dddd, MMMM D')?"text-green-300":"text-orange-300"}`} href={`/task/details/${dayjs(task.date).format('YYYY-MM-DD')}`}>{dayjs(task.date).format('dddd, MMMM D')}</Link>             
            </div>
            ))}
        </div>
    );
}