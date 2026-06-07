import { apiClient } from "./apiClient";

export const addTaskService = async(taskData) => {
    try {
        const res = await apiClient.post('/task/', taskData);
        return res.data;
    } catch (err) {
        console.error('addTaskService error:', err?.response?.status, err?.response?.data || err.message);
        if (err?.response?.data?.message) {
            throw new Error(err.response.data.message);
        }
        throw err;
    }
};
export const getTaskService= async(data)=>{
    try{
        const res= await apiClient.get('/task/',data);
        return res.data;
    }catch(err){
        if(err?.response?.data?.message){
            throw new Error(err.response.data.message);
        }
        throw err;
    }
}