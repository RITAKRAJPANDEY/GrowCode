import axios from "axios";
import { apiClient } from "./apiClient";

interface CreateTaskPayload {
    workout: boolean;
    commits: number;
    dsaq: number;
    platform?: string | null;
    project?: string | null;
    description?: string | null;
    other1?: string | null;
    other2?: string | null;
}

interface GetTaskRowData {
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

interface AddTaskResponse {
    success: boolean;
    created_at: string;
    id: string;
    message?: string;
}


export const addTaskService = async (taskData: CreateTaskPayload): Promise<AddTaskResponse> => {
    try {
        const res = await apiClient.post<AddTaskResponse>('/task/', taskData);
        return res.data;
    } catch (err: unknown) {

        if (axios.isAxiosError(err)) {
            console.error(
                'fAdd Task Service Error:',
                err.response?.status || "Network Error",
                err.response?.data || err.message
            );


            const serverMessage = (err.response?.data as { message?: string })?.message;
            if (serverMessage) {
                throw new Error(serverMessage);
            }
        }


        throw err;
    }
};


export const getTaskByDateService = async (date: string): Promise<GetTaskRowData> => {
    try {
        const res = await apiClient.get<{ success: boolean; task: GetTaskRowData }>(`/task/${date}`);
        return res.data.task;
    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            console.error(
                "fGetTaskService Error:",
                err.response?.status || "Network error",
                err.response?.data || err.message
            );

            const serverMessage = (err.response?.data as { message?: string })?.message;
            if (serverMessage) throw new Error(serverMessage);
        }
        throw err;
    }
};

interface config {
    userIds?: string[];
    cursor?: string | null;
    direction?: 'next' | 'prev';
    limit?: number;
    fromDate?: string;
    toDate?: string;
}

export const fetchTasks = async (config: config) => {
    try {
        const url = new URL('/api/task', window.location.origin)
        if (config.userIds && config.userIds.length>0) {
            config.userIds.forEach(id => url.searchParams.append('user_id', id));
        }
        if (config.limit) { url.searchParams.set('limit', config.limit.toString()); }
        if (config.cursor) { url.searchParams.set('cursor', config.cursor); }
        if (config.direction) { url.searchParams.set('direction', config.direction); }
        if (config.fromDate) { url.searchParams.set('fromDate', config.fromDate) }
        if (config.toDate) { url.searchParams.set('toDate', config.toDate) }
        const res = await apiClient.get(url.toString());
        return res
    } catch (err: unknown) {
        throw err;
    }
}

export const fetchFeedback = async (date:Date)=>{
    try{
        const res = await apiClient.post(`/api/${date}`);
        return res.data;
    }catch(err:unknown){
        console.error(err);
    }
}