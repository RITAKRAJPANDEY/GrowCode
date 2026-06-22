'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import dayjs from "dayjs";

export default function Navbar() {
    
    const pathname = usePathname();
    return (
        <div className="fixed top-0 left-0 flex flex-col w-64 h-screen p-4 gap-10 bg-[#020617] text-[#f1f5f9]">


            <div className="bg-[#020617] rounded-md">
                <h1 className="text-3xl font-bold px-2">
                    <span className="text-[#34d399]">
                        Grow
                        </span>Code</h1>
            </div>
                <div >
            <div className="flex flex-col gap-4">
                <Link
                    href="/addtask"
                    className={` ${pathname==="/addtask"?"text-green-300 ":"text-slate-400"} flex py-2 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-xl hover:text-green-300 transition-all `}
                >
                    Add Task
                </Link>
                <Link
                    href={`/feedback/${dayjs().format('YYYY-MM-DD')}`}
                     className={` ${pathname===`/feedback/${dayjs().format('YYYY-MM-DD')}`?"text-green-300 ":"text-slate-400"} flex py-2 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-xl hover:text-green-300 transition-all `}
                >
                    Add Feedback
                </Link>
            </div>

            <div className="flex flex-col gap-8">

                <div className="flex flex-col gap-2">
                    <h2 className="py-1 px-2 text-sm font-semibold uppercase tracking-wider text-[#34d399] bg-[#0f172a]/30 rounded">
                        Chat
                    </h2>
                    <Link href="/" className={` ${pathname==="/group"?"text-green-300 ":"text-slate-400"} flex py-2 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-xl hover:text-green-300 transition-all `}>Group</Link>
                    <Link href="/" className="flex py-1.5 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-lg hover:text-white text-slate-400">user1</Link>
                    <Link href="/" className="flex py-1.5 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-lg hover:text-white text-slate-400">user2</Link>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="py-1 px-2 text-sm font-semibold uppercase tracking-wider text-[#34d399] bg-[#0f172a]/30 rounded">
                        Statistics
                    </h2>
                    <Link href="/" className="flex py-1.5 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-lg hover:text-red-700 text-slate-400">Be Content</Link>
                    <Link href="/" className="flex py-1.5 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-lg hover:text-green-300 text-slate-400">Be Competent</Link>
                </div>

            </div>
</div>
            <div className="mt-auto pt-4 border-t rounded-md bg-[#020617]  border-[#0f172a]">
              
                <Link
                    href="/logout"
                     className={` ${pathname==="/logout"?"text-red-300 ":"text-slate-400"} flex py-2 justify-center hover:bg-[#0f172a] hover:scale-98 rounded-md w-full text-xl hover:text-green-300 transition-all `}>Log Out</Link>
            </div>

        </div>
    );
}