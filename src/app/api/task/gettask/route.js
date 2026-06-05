import { getTaskController } from "../../../../modules/task/task.controller"

export const GET = async(req)=>{
    return getTaskController(req);
}