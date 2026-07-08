'use client'
import Details from "@/src/components/detailsCard";
import Navbar from "@/src/components/NavBar";
import { DynamicColorSlider } from "@/src/components/slider";
import UtilityBar from "@/src/components/UtilityBar";
import { useParams } from "next/navigation";
export default function Feedback(){
    const {date}=useParams();
      return <div className="flex w-screen h-screen  bg-[#0f172a]">
           <div className="flex-none">
            <Navbar/>
           </div>
           <div className="flex-1 min-w-0 overflow-y-auto">
               
               <Details/>
            <DynamicColorSlider  />
                
           </div>
           <div className="flex-none">
               <UtilityBar/>
           </div>
       </div>
}