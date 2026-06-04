import { apiClient } from "./apiClient";

export const addTaskService = async(taskData) => {
    try {
        const res = await apiClient.post('/task/addtask', taskData);
        return res.data;
    } catch (err) {
        console.error('addTaskService error:', err?.response?.status, err?.response?.data || err.message);
        if (err?.response?.data?.message) {
            throw new Error(err.response.data.message);
        }
        throw err;
    }
};
