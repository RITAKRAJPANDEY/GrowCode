import {pool} from "../../lib/db"
export const addTaskRepo = async(taskData,userId)=>{
    const result = await pool.query(`INSERT INTO tasks
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