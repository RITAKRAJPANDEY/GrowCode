import { pool } from "../../lib/db"
import { decodeCursorUtil } from "./task.utils";
import { QueryParams } from "./task.validator";
import { taskData } from "./types";

interface getTaskRowData {
    workout: boolean;
    commits: number;
    dsaq: number;
    platform: string | null;
    project: string | null;
    description: string | null;
    other1: string | null;
    other2: string | null;
    created_at: Date;
    id: string;
}

interface addTaskRowData {
    id: string;
    created_at: Date;
}
export const addTaskRepo = async (taskData: taskData, userId: string) => {
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
        other2) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id, created_at`, [
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
    return result.rows[0] || null;
}//axios , cookiesstore using zustand and zustand psql sync 

export const getTaskRepo = async (date: Date, userId: string) => {
    const result = await pool.query<getTaskRowData>(`SELECT workout,commits,dsaq,platform,project,description,other1,other2,created_at FROM tasks WHERE user_id = $1 AND date = $2`, [userId, date]);
    return result.rows[0] || null;
}
export const dynamicTaskQueryRepo = async (searchParam:QueryParams) => {

    const values: unknown[] = [searchParam.userIds ?? []];
    const conditions: string[] = [];
    let index = 2;

    let query = `SELECT id, 
    user_id, 
    workout, 
    commits, 
    dsaq, 
    platform, 
    project, 
    description, 
    other1, 
    other2, 
    created_at, 
    date::TEXT AS date FROM tasks WHERE user_id = ANY($1)`

    if (searchParam.fromDate && searchParam.toDate) {
        conditions.push(`created_at>=$${index++}::timestamptz AND created_at<=$${index++}::timestamptz`)
        values.push(searchParam.fromDate, searchParam.toDate)
    }

    let currentOrder = 'DESC';


    if (searchParam.cursor) {
        const { created_at, id } = decodeCursorUtil(searchParam.cursor);

        if (searchParam.direction === 'next') {
            conditions.push(`(created_at,id)<($${index++}::timestamptz,$${index++})`);
            values.push(created_at, id);
        } else if (searchParam.direction === 'prev') {
            conditions.push(`(created_at,id)>($${index++}::timestamptz,$${index++})`);
            values.push(created_at, id);
            currentOrder = 'ASC';
        }
    }

    if (conditions.length > 0) {
        query += ` AND ${conditions.join(' AND ')}`;
    }

    query += ` ORDER BY created_at ${currentOrder} LIMIT $${index++}`;

    console.error(searchParam.limit);

    const limitVal = searchParam.limit??5;

    values.push(limitVal + 1);

    const result = await pool.query(query, values);

    let row = result.rows;

    const hasMore = result.rows.length > limitVal;

    if (hasMore) {
       
        row = result.rows.slice(0, limitVal);
    }

   

    return { data: row, hasMore: hasMore };
};

export const addFeedbackRepo=async(feedback:number,userId:string,date:Date)=>{
    const result = await pool.query(`INSERT INTO tasks (feedback) VALUES ($1) WHERE user_id=$2 and date=$3 RETURNING created_at `);
    return result.rows||null;
}