import { addTaskRepo, getTaskRepo } from "./task.repository";
import { AppError } from "../../errors/AppError";
import {Unauthorized} from "../../errors/Unauthorized"
import { BadRequestError } from "../../errors/BadRequestError";
import { taskData } from "./types";
import { error } from "console";
export const addTaskService = async({validatedData,userId}:{validatedData:taskData,userId:string})=>{
    if (!userId) {
        throw new AppError("Unauthorized request", 401);
    }
    try {
        const task = await addTaskRepo(validatedData,userId);
        return { created_at: task?.created_at ?? null, id: task?.id ?? null };
    } catch (error:unknown) {
        if ((error as {code?:string}).code === '23505') {
            throw new AppError('A task for this date already exists.', 409);
        }
        throw error;
    }
}

export const getTaskService = async({validatedData,userId}:{validatedData:Date,userId:string})=>{
    if(!userId){
        throw new  Unauthorized()
    }
    const task = await getTaskRepo(validatedData,userId);
    if(!task){
        throw new BadRequestError("No Task Found for this date",);
    }
    return {task:task};
}