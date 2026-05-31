'use client';


import { useRouter } from "next/navigation";
import { fLogOutService } from "../services/auth.services";
import Link from "next/link";
export default function LogOUt() {
    const router = useRouter();
const handleLogOut=async()=>{
    try{
            await fLogOutService();
            router.push("/login")
            
    }catch(err){
        console.error(err);
    }

    
}
    return  <div className="fixed  inset-0 flex items-center justify-center w-full min-h-screen">
        <div className="absolute  inset-0 flex flex-col justify-center items-center p-6 text-center">        
            <div className="max-w-4xl p-8 flex border border-slate-600/20 blackdrop-blur-md  bg-slate-600/10  rounded-xl shadow-lg flex-col items-center gap-6 pointer-events-auto select-none">              
                <h1 className="text-4xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                    LogOut               
                </h1>            
                <p className="text-xl flex flex-col gap-2 px-4 md:text-2xl font-medium text-slate-300 max-w-2xl balance leading-relaxed">
                   {` Do  you want to logout ?`} <br/>
                   <span className="text-sm text-red-200"> we expected more from you </span>
                    
                </p>     
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                    
                    <button onClick={handleLogOut} className="px-8 py-3 bg-slate-900/60 text-slate-200 font-semibold rounded-xl border border-slate-800 hover:bg-red-400/80 transition-all backdrop-blur-sm">
                       Log Out
                    </button>
                     <Link href={'/'} className="px-8 py-3 bg-slate-900/60 text-slate-200 font-semibold rounded-xl border border-slate-800 hover:bg-green-400/80 transition-all backdrop-blur-sm">Home</Link>
                </div>
            </div>
        </div>
    </div>
}