'use client';
import Navbar from "../components/NavBar"
import Hyperspeed from "../components/Hyperspeed"
export default function Main(){
  return <div className="flex bg-[#0f172a] ">
    <Navbar/>
        <div className="flex-1 min-w-0 overflow-x-hidden overflow-y-hidden">
            <Hyperspeed/>
        </div>
        
  </div>
}