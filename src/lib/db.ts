import {Pool} from 'pg';
import {env} from './env';// uses the zod validation in the env.ts
// so that it dosen't hot reloads everytime we rerender and pg reaches pool limit in dev
declare global{
    var postgresPool:Pool |undefined;
}

let pool : Pool;


if(process.env.NODE_ENV==='production'){
     pool = new Pool ({
        user:env.DB_USER,
        host:env.DB_HOST,
        database:env.DB_NAME,
        port:env.DB_PORT,
        password:env.DB_PASSWORD
    });
}else{// if it's dev and no pool exists declare the global var postgresPool 
    if(!globalThis.postgresPool){
        globalThis.postgresPool = new Pool ({
        user:env.DB_USER,
        host:env.DB_HOST,
        database:env.DB_NAME,
        port:env.DB_PORT?Number(process.env.DB_PORT):5432,
        password:env.DB_PASSWORD,
        });
}// if it already exists let pool be that global var so we don't create a new pool 
 pool = globalThis.postgresPool;
}
export {pool};

