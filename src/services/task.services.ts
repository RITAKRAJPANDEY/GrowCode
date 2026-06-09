import axios, { AxiosError, AxiosResponse } from "axios";
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
    id: string;
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


export const getTaskService = async (): Promise<GetTaskRowData[]> => { 
    try {
        const res = await apiClient.get<GetTaskRowData[]>('/task/');
        return res.data;
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