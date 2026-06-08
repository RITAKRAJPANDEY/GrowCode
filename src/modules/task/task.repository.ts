import {pool} from "../../lib/db"
import { taskData } from "./types";

interface getTaskRowData{
    workout:boolean;
    commits:number;
    dsaq:number;
    platform:string| null;
    project:string |null;
    description:string | null;
    other1:string | null;
    other2:string |null;
    created_at:Date;
    id:string;
}

interface addTaskRowData{
    id:string;
    created_at:Date;
}
export const addTaskRepo = async(taskData:taskData,userId:string)=>{
    const result = await pool.query<addTaskRowData>(`INSERT INTO tasks
        (date,
        user_id,
        workout,
        commits,
        dsaq,
        platform,
        project,
        description,
        other1,
        other2) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id, created_at`,[
        taskData.date,
        userId,
        taskData.workout,
        taskData.commits,
        taskData.dsaq,
        taskData.platform,
        taskData.project,
        taskData.description,
        taskData.other1,
        taskData.other2
    ]);
    return result.rows[0]||null;
}//axios , cookiesstore using zustand and zustand psql sync 

export const getTaskRepo= async(date:Date , userId:string)=>{
    const result = await pool.query<getTaskRowData>(`SELECT workout,commits,dsaq,platform,project,description,other1,other2,created_at FROM tasks WHERE user_id = $1 AND date = $2`,[userId,date]);
    return result.rows[0]||null;
}