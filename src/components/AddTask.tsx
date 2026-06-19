'use client';

import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Switch from "./yesButton";
import { useEffect } from 'react';
import {useTaskStore} from "../store";


interface TaskData{
    id?:string;
    date:Date;
    workout:boolean;
    commits:number;
    platform:string|null;
    dsaq:number;
    project?:string|null;
    description?:string|null;
    other1?:string|null;
    other2?:string|null;
}

export default function AddTasks() {
    const [date, setDate] = useState<Dayjs|null>(null);
    const [workout, setWorkout] = useState<boolean>(true);
    const [commits, setCommits] = useState<string>(" ");
    const [platform, setPlatform] = useState<string>("cf");
    const [dsaq, setDsaq] = useState<string>(" ");
    const [project, setProject] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [other1, setOther1] = useState<string>("");
    const [other2, setOther2] = useState<string>("");
    const addTask = useTaskStore((state)=>state.addTask);
    useEffect(() => {
        //eslint-disable-next-line
        setDate(dayjs());
    }, []);

    const handleSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault();
        try {
            const Task:TaskData = {
                date: date ? date.toDate() : new Date(),
                workout: workout,
                commits: commits ? Number(commits) : 0,
                platform: platform,
                dsaq: dsaq ? Number(dsaq) : 0,
                project: project || "",
                description: description || "",
                other1: other1 || "",
                other2: other2 || ""
            };
            await addTask(Task);
            setWorkout(true);
            setCommits("");
            setDescription("");
            setDsaq("");
            setOther1("");
            setOther2("");
            setPlatform("cf");
            setProject("");

        } catch (err) {
          console.error(err);
        }

    }
    return (
        <div className="flex min-h-screen flex-col justify-center items-center bg-[#0f172a] p-4">
            <div className="w-full bg-[#0b101c]   p-6 border border-[#f59e0b] shadow-md rounded-md max-w-xl  text-white">
                <div className="flex flex-col gap-6">
                    <h1 className="text-4xl font-semibold">Add Tasks</h1>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="w-full">
                                <h1 className='text-white text-2xl'>{date ? date.format('DD/MM/YYYY') : "no Date Selected"}</h1>
                            </div>

                            <div className="w-full flex flex-col pt-2 md:pt-0">
                                <span className="text-sm text-gray-400 mb-1">Workout ?</span>
                                <Switch onToggle={() => setWorkout(!workout)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Commits</label>
                                <input
                                    type="number"
                                    value={commits}
                                    onChange={(e) => setCommits(e.target.value)}
                                    min="0"
                                    placeholder="0"
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-[#f59e0b] transition-colors"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">CF / LC Solved</label>
                                <div className="flex gap-2">
                                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="p-3 rounded-md bg-[#111827] border border-gray-600 text-white focus:outline-none focus:border-[#f59e0b] transition-colors">
                                        <option value="cf">CF</option>
                                        <option value="lc">LC</option>
                                    </select>
                                    <input
                                        type="number"
                                        value={dsaq}
                                        onChange={(e) => setDsaq(e.target.value)}
                                        min="0"
                                        placeholder="0"
                                        className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-[#f59e0b] transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    value={project}
                                    onChange={(e) => setProject(e.target.value)}
                                    placeholder="Enter project title"
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-[#f59e0b] transition-colors"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What will you work on?"
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-[#f59e0b] transition-colors"
                                />
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Others</label>
                                <input
                                    type="text"
                                    value={other1}
                                    onChange={(e) => setOther1(e.target.value)}
                                    placeholder="Add more task"
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-[#f59e0b] transition-colors"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Ohters</label>
                                <input
                                    type="text"
                                    value={other2}
                                    onChange={(e) => setOther2(e.target.value)}
                                    placeholder="Add more task"
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-[#f59e0b] transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors shadow-lg"
                        >
                            Thats it ?
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}