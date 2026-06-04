import {create} from "zustand";
import { addTaskService } from "./services/task.services";
import dayjs from "dayjs";
export const useTaskStore = create((set,get)=>({
    tasks:[],
    // clearTask:set(()=>({
    //     tasks:[]
    // })),

    addTask: async (newTaskObject)=>{
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

        }catch(err){
            console.error("unable to add task in db reverting ui")
            set({tasks:previousTask});
            throw err;
        }
    }
   
}));