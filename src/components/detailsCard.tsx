'use client';

import dayjs from 'dayjs';
import { getTaskByDateService } from '../services/task.services';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface TaskData {
    workout: boolean;
    commits: number;
    dsaq: number;
    platform: string | null;
    project: string | null;
    description: string | null;
    other1: string | null;
    other2: string | null;
    created_at: string; 
}

export default function Details() {
    const params = useParams();
    const dateStr = params.date as string;
    
   
    const cleanDateStr = dateStr ? decodeURIComponent(dateStr) : '';
    const date = cleanDateStr ? dayjs(cleanDateStr) : null;
    const formattedDateForBackend = date && date.isValid() ? date.format('YYYY-MM-DD') : '';

    const [data, setData] = useState<TaskData>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const taskDetails = async () => {
            try {
                setLoading(true);
                const task = await getTaskByDateService(formattedDateForBackend);
                setData(task);
            } catch (err: unknown) {
                console.error("Failed to resolve task matrix details:", err);
            } finally {
                setLoading(false);
            }
        };
      
        if (formattedDateForBackend) {
            taskDetails();
        }
    }, [formattedDateForBackend]);

    return (
        <div className="flex min-h-screen flex-col justify-center items-center bg-[#0f172a] p-6">
            <div className="w-full max-w-xl p-8 rounded-xl border border-emerald-500/30 bg-[#1e293b]/40 backdrop-blur-md shadow-2xl text-white transition-all duration-300">
                
                {/* Header Metrics Panel */}
                <div className="flex flex-col gap-2 border-b border-gray-700/50 pb-6 mb-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Log Entry View</span>
                    <h1 className="text-3xl font-bold tracking-tight">
                        {date && date.isValid() ? date.format('MMMM DD, YYYY') : "No Date Selected"}
                    </h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6">
                        
                        {/* High Priority Boolean Status Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col p-4 rounded-lg bg-[#1e293b]/80 border border-gray-800">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Workout Session</span>
                                <span className={`text-xl font-semibold ${data?.workout ? 'text-emerald-400' : 'text-gray-500'}`}>
                                    {data?.workout ? "Completed" : "Skipped"}
                                </span>
                            </div>
                            <div className="flex flex-col p-4 rounded-lg bg-[#1e293b]/80 border border-gray-800">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Source Commits</span>
                                <span className="text-2xl font-bold font-mono text-white">
                                    {data?.commits ?? 0}
                                </span>
                            </div>
                        </div>

                        {/* Quantitative Aggregates */}
                        <div className="flex flex-col p-4 rounded-lg bg-[#1e293b]/80 border border-gray-800">
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Algorithmic Problem Solutions (DSA)</span>
                            <span className="text-2xl font-bold font-mono text-emerald-400">
                                {data?.dsaq ?? 0} <span className="text-xs font-normal text-gray-500">questions matched</span>
                            </span>
                        </div>

                        {/* Text Strings and Details Lists */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col p-4 rounded-lg bg-[#1e293b]/40 border border-gray-800/60">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Active Architecture / Project Target</span>
                                <p className="text-sm font-medium text-gray-200">
                                    {data?.project || <span className="text-gray-600 italic">nil</span>}
                                </p>
                            </div>

                            <div className="flex flex-col p-4 rounded-lg bg-[#1e293b]/40 border border-gray-800/60">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Functional Log Description</span>
                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {data?.description || <span className="text-gray-600 italic">nil</span>}
                                </p>
                            </div>
                        </div>

                        {/* Auxiliary Metadata Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-800/60 pt-4">
                            <div className="flex flex-col p-3 rounded-lg bg-slate-900/40">
                                <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">Additional Context Alpha</span>
                                <span className="text-sm text-gray-300">
                                    {data?.other1 || <span className="text-gray-700 italic">nil</span>}
                                </span>
                            </div>
                            <div className="flex flex-col p-3 rounded-lg bg-slate-900/40">
                                <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1">Additional Context Beta</span>
                                <span className="text-sm text-gray-300">
                                    {data?.other2 || <span className="text-gray-700 italic">nil</span>}
                                </span>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}