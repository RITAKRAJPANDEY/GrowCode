'use client';
import { useRouter } from "next/navigation";
import Button from "./Button"
import Link from "next/link";
export default function Hero() {
    const router = useRouter();
   return (
    <div className="fixed inset-0 flex items-center justify-center w-full min-h-screen">
        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">        
            <div className="max-w-4xl flex flex-col items-center gap-6 pointer-events-auto select-none">              
                <h1 className="text-8xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                    <span className="text-[#34d399]">Grow</span>Code                 
                </h1>            
                <p className="text-xl md:text-2xl font-medium text-slate-300 max-w-2xl balance leading-relaxed">
                    Crush daily goals. Share your progress. <br />
                    <span className="text-slate-400 text-lg md:text-xl font-normal">
                        Built for close crews to stay accountable and ship projects together.
                    </span>
                </p>     
                <div className="bg-slate-950/60 backdrop-blur-md border border-slate-800/80 px-6 py-3 rounded-xl shadow-2xl shadow-black/40 font-mono text-sm md:text-base flex items-center gap-3 max-w-md w-full justify-center">
                    <span className="text-emerald-400 select-none">$</span>
                    <span className="text-slate-300 font-medium">
                        git commit -m <span className="text-green-400">{"daily-growth"}</span>
                    </span>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                    <Button path={()=>router.push('/addtask')} label="Add Task"/>
                    <Link href={'/chat'}  className="px-8 py-3 bg-slate-900/60 text-slate-300 font-semibold rounded-xl border border-slate-800 hover:bg-slate-800/80 transition-all backdrop-blur-sm">
                        Chat
                    </Link>
                </div>
            </div>
        </div>
    </div>
);
}