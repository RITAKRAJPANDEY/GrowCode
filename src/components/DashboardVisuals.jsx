const Hyperspeed = dynamic(() => import("./Hyperspeed"), { ssr: false });
const Hero = dynamic(() => import("./Hero"), { ssr: false });

import dynamic from "next/dynamic";

export default async function Main() {
    return (
        <div className="flex h-screen w-screen bg-[#0f172a] overflow-hidden relative">
            
           
                <div className="flex-1 min-w-0 h-full w-full relative overflow-hidden z-10">
                    <Hyperspeed />
                </div>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-center h-full w-full z-20">
                    <Hero />
                </div>
            

        </div>
    );
}