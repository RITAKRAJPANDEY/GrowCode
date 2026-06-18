'use client';
import Link from "next/link";
import { useTaskStore } from "../store";
import dayjs from 'dayjs';
import { useEffect } from "react";
export default function UtilityBar() {
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
        <div className="fixed top-0 right-0 flex flex-col w-64 h-screen p-4 gap-10 bg-[#020617] text-[#f1f5f9]">


            <div className="bg-[#020617] rounded-md">
                <h1 className="text-2xl text-[#f1f5f9]  px-2">
                    Tasks</h1>
            </div>
            {tasks.map((task)=>(//React can't use date as a key give either a string or an id number
                 <div key={task.id} className="text-[#f1f5f9] flex flex-col gap-2  px-2">
                    <h1 className="rounded rounded-md  "></h1>
                    <Link href={`/task/details/${task.date}`}>{dayjs(task.date).format('dddd, MMMM D')}</Link>              
            </div>
            ))}
        </div>
    );
}