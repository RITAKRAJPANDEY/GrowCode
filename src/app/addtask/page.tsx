'use client';
import { DynamicColorSlider } from "@/src/components/slider";
import AddTasks from "../../components/AddTask";
import Navbar from "../../components/NavBar";
import UtilityBar from "../../components/UtilityBar";
export default function Task(){
    return <div className="flex w-screen h-screen  bg-[#0f172a]">
        <div className="flex-none">
            <Navbar/>
        </div>
        <div className="flex-1 min-w-0 overflow-y-auto">
            <AddTasks/>
        </div>
        <div className="flex-none">
            <UtilityBar/>
        </div>
    </div>
}