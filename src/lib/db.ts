import {Pool} from 'pg';

// so that it dosen't hot reloads everytime we rerender and pg reaches pool limit in dev
declare global{
    var postgresPool:Pool |undefined;
}

let pool : Pool;


if(process.env.NODE_ENV==='production'){
     pool = new Pool ({
        user:process.env.DB_USER,
        host:process.env.DB_HOST,
        database:process.env.DB_NAME,
        port:process.env.DB_PORT?Number(process.env.DB_PORT):5432,
        password:process.env.DB_PASSWORD
    });
}else{// if it's dev and no pool exists declare the global var postgresPool 
    if(!globalThis.postgresPool){
        globalThis.postgresPool = new Pool ({
        user:process.env.DB_USER,
        host:process.env.DB_HOST,
        database:process.env.DB_NAME,
        port:process.env.DB_PORT?Number(process.env.DB_PORT):5432,
        password:process.env.DB_PASSWORD,
        });
}// if it already exists let pool be that global var so we don't create a new pool 
 pool = globalThis.postgresPool;
}
export {pool};

