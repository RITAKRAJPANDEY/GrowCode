import { addTaskController, getTaskController } from "../../../modules/task/task.controller"

export const POST =async(req)=>{
    return addTaskController(req);
}

export const GET = async(req)=>{
    return getTaskController(req);
}