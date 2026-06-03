import { addTaskRepo } from "./task.repository";

export const addTaskService = async({validatedData,userId})=>{
    const task = await addTaskRepo(validatedData,userId);
    return {created_at:task?task.created_at:null}
}