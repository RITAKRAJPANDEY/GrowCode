'use client';
import Navbar from "../components/NavBar"
import Hyperspeed from "../components/Hyperspeed"
import Hero from "../components/Hero"
export default function Main(){
  return <div className="flex  min-h-screen bg-[#0f172a] ">
    <Navbar/>
        <div className="flex-1 min-w-0 overflow-x-hidden overflow-y-hidden">
            <Hyperspeed/>
        </div>       
        <div  className="absolute position:fixed py-90 insert-0 pointer-events-none flex items-center justify-center min-height-screen w-full">
            <Hero/>
        </div>
  </div>
}