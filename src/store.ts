import { create } from "zustand";
import { addTaskService, fetchTasks } from "./services/task.services";
import dayjs from "dayjs";

import {io,Socket} from "socket.io-client"


interface Task {
    id?: string;
    date: Date;
    workout: boolean;
    commits: number;
    platform: string | null;
    dsaq: number;
    project?: string | null;
    description?: string | null;
    other1?: string | null;
    other2?: string | null;
}

interface TaskState {
    tasks: Task[];

    addTask: (newTaskObject: Task) => Promise<void>
    getTaskByDate: () => Promise<void>
}
export const useTaskStore = create<TaskState>((set, get) => ({//generics beach
    tasks: [],
    // clearTask:set(()=>({
    //     tasks:[]
    // })),

    addTask: async (newTaskObject: Task) => {
        const previousTask = [...get().tasks];
        const todayTaskDate = dayjs(newTaskObject.date).format('YYYY/MM/DD');
        const dayTaskAlreadyExist = previousTask.some((task) => dayjs(task.date).format('YYYY/MM/DD') === todayTaskDate);
        if (dayTaskAlreadyExist) {
            alert("A task Has Already Been looged for this day");
            throw new Error("Duplicate Task For same day ");
        }

        const tempId = newTaskObject.id || crypto.randomUUID();
        const temporaryTask = { ...newTaskObject, id: tempId };

        set((state) => ({
            tasks: [...state.tasks, temporaryTask]
        }));
        try {

            const savedTask = await addTaskService(newTaskObject);

            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === tempId
                        ? { ...task, id: savedTask.id } : task)
            }))

        } catch (err: unknown) {
            console.error("unable to add task in db reverting ui")
            set({ tasks: previousTask });
            throw err;
        }
    },
    getTaskByDate: async () => {
        try {
            const response = await fetchTasks({ limit: 10 })
            const fetchedTasks = response?.data?.tasks;
            set( {
              tasks:fetchedTasks
            });
        } catch (err: unknown) {
            console.log("unable to fetch tasks in store")
            throw err;
        }
    }
}));

interface ChatStore{
    socket:Socket|null;
    isConnected:boolean;
    initSocket:()=>void;
    disconnectSocket:()=>void;
    joinRoom:(roomId:string)=>void;
    sendMessage:({roomId,message,senderId}:{roomId:string,message:string,senderId:string})=>void;
}

export const useChatStore = create<ChatStore>((set,get)=>({
    socket:null,
    isConnected:false,
    initSocket:()=>{
        if(get().socket)return;
        const socketUrl = typeof window !== 'undefined'
            ? `http://${window.location.hostname}:3001`
            : 'http://localhost:3001';
        const socketInstance = io(socketUrl, {
            autoConnect:true,
            reconnection:true,
            transports:['websocket']
        });
        socketInstance.on('connect',()=>set({isConnected:true}));
        socketInstance.on('disconnect',()=>set({isConnected:false}));
        socketInstance.on('connect_error',()=>set({isConnected:false}));
        set({socket:socketInstance})
    },
    disconnectSocket:()=>{
        const {socket}=get();
        if(socket){
            socket.disconnect();
            set({isConnected:false,socket:null});
        }
    },
    joinRoom:(roomId)=>{
        
        const {socket}=get();
        if(socket){
            socket.emit('join_room',roomId)
        }
    },
    sendMessage:({roomId,message,senderId})=>{
        const {socket}=get();
        if(socket){
            socket.emit('send_message',{roomId,message,senderId});
        }
    }

}));