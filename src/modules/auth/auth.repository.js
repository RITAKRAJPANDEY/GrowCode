import { AppError } from "../../errors/AppError";
import { pool } from "../../lib/db";

export const addUserRepo = async (username, hashed_password, hashed_email) => {
    const result = await pool.query(`INSERT INTO users(username,password,email) VALUES ($1,$2,$3) RETURNING created_at,username`, [username, hashed_password, hashed_email]);
    return result.rows[0] || null;
}
export const fetchUserRepo = async (username) => {
    const result = await pool.query(`SELECT id, active , password , created_at FROM users WHERE LOWER(username)=LOWER($1)`, [username]);
    return result.rows[0] || null;
}
export const storeTokenHashRepo = async (refreshTokenHash, user_id) => {
    const result = await pool.query(`INSERT INTO refreshtoken(user_id,refresh_hash) VALUES ($1,$2) RETURNING created_at `, [user_id, refreshTokenHash]);
    return result.rows[0] || null;
}
export const getRefreshTokenRepo = async (refreshTokenHash) => {
    const result = await pool.query(`SELECT is_revoked, user_id ,expires_at FROM refreshtoken  WHERE refresh_hash=$1`, [refreshTokenHash]);
    return result.rows[0] || null;
}
export const revokeAllRefreshTokens = async (user_id) => {
    const result = await pool.query(`UPDATE refreshtoken SET is_revoked=$1,revoked_at=NOW() WHERE user_id = $2 AND is_revoked=$3 RETURNING revoked_at`, [true, user_id, false]);
    return result.rows[0] || null;
}
export const fetchUserIdRepo = async (user_id) => {
    const result = await pool.query(`SELECT id, role FROM users WHERE id=$1`, [user_id]);
    return result.rows[0] || null;
}
export const addNewRefreshTokenRepo = async (newToken, user_id, oldToken) => {
    const client = await pool.connect();
    let transactionCommited = false;//always add this flag so the db dosen't throw any error due to a rollback after a sucessfull commit 
    try {
        await client.query('BEGIN');
        const lockRow = await client.query(`SELECT id,is_revoked FROM refreshtoken where refresh_hash = $1 AND user_id = $2 FOR UPDATE `, [oldToken, user_id])//newtoken,userid,oldtoken
        if (lockRow.rowCount === 0) {
            throw new AppError("Token Dosen't Exists", 401);
        }
        const currentTokenState = lockRow.rows[0];
        if (currentTokenState.is_revoked == true) {

            await client.query(`UPDATE refreshtoken SET is_revoked=$1,revoked_at=NOW() WHERE user_id = $2 AND is_revoked=$3 RETURNING revoked_at`, [true, user_id, false]);

            await client.query(`COMMIT`);
            throw new AppError("Security Alert : Token theft detected Revoking all Sessions", 401);
        }
        const revokeToken = await client.query(`UPDATE refreshtoken SET is_revoked = $1 , revoked_at=NOW() WHERE refresh_hash=$2 RETURNING revoked_at`, [true, oldToken]);

        if (revokeToken.rowCount === 0) {
            throw new AppError("Token Already Revoked", 401)
        }

        const result = await client.query(`INSERT INTO refreshtoken(user_id,refresh_hash) VALUES($1,$2) RETURNING created_at`, [user_id, newToken]);

        await client.query('COMMIT');
        transactionCommited = true;
        return result.rows[0] || null;
    } catch (err) {
        if (!transactionCommited) {
            await client.query('ROLLBACK');
        }
        throw err;
    } finally {
        client.release();
    }
}
export const revokeToken = async(oldToken)=>{
     const result = await pool.query(`UPDATE refreshtoken SET is_revoked = $1 , revoked_at=NOW() WHERE refresh_hash=$2 RETURNING revoked_at`, [true, oldToken]);
     return result.rows[0]||null;
}