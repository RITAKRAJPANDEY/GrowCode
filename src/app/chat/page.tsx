'use client';

import Navbar from "@/src/components/NavBar";
import UtilityBar from "@/src/components/UtilityBar";
import Chat from "@/src/components/Chat";

export default function  ChatPage() {
  return (
    /* 1. Global Wrapper: Set up a three-column grid that fills the viewport */
    <div className="grid grid-cols-[240px_1fr_300px] h-screen w-screen overflow-hidden bg-slate-950">
      
      {/* LEFT SIDEBAR (GrowCode menu) */}
      <aside className="h-full border-r border-slate-800 bg-slate-900">
        <Navbar/>
      </aside>

      {/* CENTER COLUMN (Your actual Chat page.tsx renders here) */}
      <main className="h-full overflow-hidden min-w-0">
       <Chat/>
      </main>

      {/* RIGHT SIDEBAR (Tasks menu) */}
      <aside className="h-full border-l border-slate-800 ">
      <UtilityBar/>
      </aside>

    </div>
  );
    
}