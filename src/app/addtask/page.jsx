'use client';
import AddTasks from "../../components/AddTask";
import Navbar from "../../components/NavBar";
export default function Task(){
    return <div className="flex w-screen h-screen  bg-[#0f172a]">
        <div >
            <Navbar/>
        </div>
        <div className="flex-1 min-w-0">
            <AddTasks/>
        </div>
    </div>
}