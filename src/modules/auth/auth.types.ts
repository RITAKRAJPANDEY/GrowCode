export interface userRow{
    id:string;
    role:string;
    active:boolean;
    password:string;
    created_at:Date;
    email:string;
    username:string;
}

export interface refreshTokenRow {
    id:string;
    user_id:string;
    refresh_hash:string;
    revoked_at:Date|null;
    is_revoked:boolean;
    created_at:Date;
    expires_at:Date;
}

export type userAuthDetails = Pick<userRow,'id'|'password'|'created_at'|'active'|'role'|'username'>;
export type tokenCreateionResult = Pick<refreshTokenRow,'created_at'>;
export type tokenRevocationionResult = Pick<refreshTokenRow,'revoked_at'>;
