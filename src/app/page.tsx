'use client';
import Navbar from "../components/NavBar"
import Hyperspeed from "../components/Hyperspeed"
import Hero from "../components/Hero"
import Loading from "../components/Loading"
import { Suspense } from "react";

export default function Main() {
    return (
        <div className="flex h-screen w-screen bg-[#0f172a] overflow-hidden relative">
            <div className="relative z-50 flex-none">
                <Navbar />
            </div>
            <Suspense fallback={<div className="absolute inset-0 pointer-events-none flex items-center justify-center h-full w-full z-20">
                    <Loading/>
                </div>}>
                <div className="flex-1 min-w-0 h-full w-full relative overflow-hidden z-10">
                    <Hyperspeed />
                </div>

                <div className="absolute inset-0 pointer-events-none flex items-center justify-center h-full w-full z-20">
                    <Hero />
                </div>
            </Suspense>

        </div>
    );
}