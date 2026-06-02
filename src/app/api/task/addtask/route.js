import { addTaskController } from "../../../../modules/task/task.controller"

export const POST =async(req)=>{
    return addTaskController(req);
}