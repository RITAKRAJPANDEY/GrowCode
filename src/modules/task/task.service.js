import { addTaskRepo } from "./task.repository";
import { AppError } from "../../errors/AppError";

export const addTaskService = async({validatedData,userId})=>{
    if (!userId) {
        throw new AppError("Unauthorized request", 401);
    }
    try {
        const task = await addTaskRepo(validatedData,userId);
        return { created_at: task?.created_at ?? null, id: task?.id ?? null };
    } catch (error) {
        console.error('addTaskService failed', {
            code: error?.code,
            message: error?.message,
            detail: error?.detail,
            constraint: error?.constraint,
            taskDate: validatedData?.date,
            userId,
        });
        if (error?.code === '23505') {
            throw new AppError('A task for this date already exists.', 409);
        }
        throw error;
    }
}