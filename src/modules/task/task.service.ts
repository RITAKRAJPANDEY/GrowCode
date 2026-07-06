import { addTaskRepo, dynamicTaskQueryRepo, getTaskRepo } from "./task.repository";
import { AppError } from "../../errors/AppError";
import { Unauthorized } from "../../errors/Unauthorized"
import { BadRequestError } from "../../errors/BadRequestError";
import { taskData } from "./types";
import { QueryParams } from "./task.validator";
import { encodeCursorUtil } from "./task.utils";
export const addTaskService = async ({ validatedData, userId }: { validatedData: taskData, userId: string }) => {
    if (!userId) {
        throw new AppError("Unauthorized request", 401);
    }
    try {
        const task = await addTaskRepo(validatedData, userId);
        return { created_at: task?.created_at ?? null, id: task?.id ?? null };
    } catch (error: unknown) {
        if ((error as { code?: string }).code === '23505') {
            throw new AppError('A task for this date already exists.', 409);
        }
        throw error;
    }
}

export const getTaskService = async ({ validatedData, userId }: { validatedData: Date, userId: string }) => {
    if (!userId) {
        throw new Unauthorized()
    }
    const task = await getTaskRepo(validatedData, userId);
    if (!task) {
        throw new BadRequestError("No Task Found for this date",);
    }
    return { task: task };
}

export const allTaskDataService = async (searchParams: QueryParams, userId: string) => {

    if (!userId) {
        throw new Unauthorized()
    }
    if (searchParams.toDate && searchParams.fromDate) {

        if (((searchParams.fromDate) > (searchParams.toDate))) {
            throw new BadRequestError("from cannot be greater than to")
        }
    }
    const { data, hasMore } = await dynamicTaskQueryRepo(searchParams);
    let nextCursor: string | null = null;
    let prevCursor: string | null = null;


    if (searchParams.direction === 'next' || !searchParams.direction) {
        if (hasMore && data.length > 0) {
            const lastItem = data[data.length - 1]
            nextCursor = encodeCursorUtil({ created_at: lastItem.created_at, id: lastItem.id });
        }
        if (searchParams.cursor && data.length > 0) {
            prevCursor = encodeCursorUtil({ created_at: data[0].created_at, id: data[0].id })
        }
    } else if (searchParams.direction === 'prev') {
        if (hasMore && data.length > 0) {
            const oldItemInAscScan = data[data.length - 1];
            prevCursor = encodeCursorUtil({ created_at: oldItemInAscScan.created_at, id: oldItemInAscScan.id });
        }
        if (data.length > 0) {
            const newItemInAscScan = data[0];
            nextCursor = encodeCursorUtil({ created_at: newItemInAscScan.created_at, id: newItemInAscScan.id });
        }
        data.reverse();
    }
    return { tasks: data, prevCursor: prevCursor, nextCursor: nextCursor };
}

export const addFeedbackService = async (userId: string | null, validatedData: number) => {
    if (!userId) {
        throw new Unauthorized();
    }

}