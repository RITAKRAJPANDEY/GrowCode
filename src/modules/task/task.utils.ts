export const encodeCursorUtil = ({created_at,id}:{created_at:string,id:string})=>{
    return Buffer.from(JSON.stringify({created_at,id})).toString('base64url');
};
export const decodeCursorUtil = (cursor:string)=>{
    return JSON.parse(Buffer.from(cursor,'base64url').toString('utf-8'))
}
