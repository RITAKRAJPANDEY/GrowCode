import { pool } from "../../lib/db";

export const addUserRepo= async(username,hashed_password,hashed_email)=>{
    const result = await pool.query(`INSERT INTO users(username,password,email) VALUES ($1,$2,$3) RETURNING created_at,username`,[username,hashed_password,hashed_email]);
    return result.rows[0]||null;
}
export const fetchUserRepo=async(username)=>{
    const result = await pool.query(`SELECT id, active , password , created_at FROM users WHERE LOWER(username)=LOWER($1)`,[username]);
    return result.rows[0]||null;
}
export const storeTokenHashRepo=async(refreshTokenHash, user_id)=>{
    const result = await pool.query(`INSERT INTO refreshtoken(user_id,refresh_hash) VALUES ($1,$2) RETURNING created_at `,[user_id,refreshTokenHash]);
    return result.rows[0]||null;
}