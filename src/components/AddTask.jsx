'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import Switch from "./yesButton";
import { useEffect } from 'react';
import { addTaskService } from '../services/task.services';


export default function AddTasks() {
    const [date, setDate] = useState(null);
    const [workout, setWorkout] = useState(true);
    const [commits, setCommits] = useState("");
    const [platform, setPlatform] = useState("");
    const [dsaq, setDsaq] = useState("");
    const [project, setProject] = useState("");
    const [description, setDescription] = useState("");
    const [other1, setOther1] = useState("");
    const [other2, setOther2] = useState("");

    useEffect(() => {
        //eslint-disable-next-line
        setDate(dayjs());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const Task = {
                date: date ? date.toISOString() : new Date().toISOString(),
                workout: workout,
                commits: commits ? Number(commits) : 0,
                platform: platform,
                dsaq: dsaq ? Number(dsaq) : 0,
                project: project || "",
                description: description || "",
                other1: other1 || "",
                other2: other2 || ""
            };
            await addTaskService(Task);
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
        <div className="flex min-h-screen flex-col justify-center items-center p-4">
            <div className="w-full p-6 border border-red-300 shadow-md rounded-md max-w-xl bg-[#0b1329] text-white">
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
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">CF / LC Solved</label>
                                <div className="flex gap-2">
                                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="p-3 rounded-md bg-[#111827] border border-gray-600 text-white focus:outline-none focus:border-white transition-colors">
                                        <option value="cf">CF</option>
                                        <option value="lc">LC</option>
                                    </select>
                                    <input
                                        type="number"
                                        value={dsaq}
                                        onChange={(e) => setDsaq(e.target.value)}
                                        min="0"
                                        placeholder="0"
                                        className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
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
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What will you work on?"
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
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
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-400 mb-1">Ohters</label>
                                <input
                                    type="text"
                                    value={other2}
                                    onChange={(e) => setOther2(e.target.value)}
                                    placeholder="Add more task"
                                    className="w-full p-3 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors shadow-lg"
                        >
                            Thats it
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}