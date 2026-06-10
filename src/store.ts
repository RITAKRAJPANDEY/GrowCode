import {create} from "zustand";
import { addTaskService } from "./services/task.services";
import dayjs from "dayjs";

interface Task {
    id:string;
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

interface TaskState {
    tasks:Task[];
    
    addTask:(newTaskObject:Task)=>Promise<void>

}
export const useTaskStore = create<TaskState>((set,get)=>({//generics beach
    tasks:[],
    // clearTask:set(()=>({
    //     tasks:[]
    // })),

    addTask: async (newTaskObject:Task)=>{
        const previousTask = [...get().tasks] ;
        const todayTaskDate = dayjs(newTaskObject.date).format('YYYY/MM/DD');
        const dayTaskAlreadyExist = previousTask.some((task)=>dayjs(task.date).format('YYYY/MM/DD')===todayTaskDate);
        if(dayTaskAlreadyExist){
            alert("A task Has Already Been looged for this day");
            throw new Error("Duplicate Task For same day ");
        }

        const tempId=newTaskObject.id||crypto.randomUUID();
        const temporaryTask = {...newTaskObject,id:tempId};

        set((state)=>({
            tasks:[...state.tasks,temporaryTask]
        }));
        try{
            
            const savedTask = await addTaskService(newTaskObject);
            
            set((state)=>({
                tasks:state.tasks.map((task)=>
                task.id===tempId
             ?{...task,id:savedTask.id}:task)
            }))

        }catch(err:unknown){
            console.error("unable to add task in db reverting ui")
            set({tasks:previousTask});
            throw err;
        }
    }
   
}));