import z from "zod";

const validateEnvSchema = z.object({
    NODE_ENV:z.enum(['production','test','development']).default('development'),
    DB_USER:z.string().min(1,"Database user is required"),
    DB_PASSWORD:z.string().min(1,"Database password is required"),
    DB_NAME:z.string().min(1,"Database name is requried"),
    DB_HOST:z.string().min(1,"Database host is requred"),
    DB_PORT:z.coerce.number().default(5432)// coerce forces the string into a number js object (document se nikala )

});

const parsedEnv = validateEnvSchema.safeParse(process.env);

if(!parsedEnv.success){
    console.error("Invalid environment variables ",parsedEnv.error.format());
    throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;


// DB_USER=
// DB_PASSWORD=
// DB_PORT=
// DB_NAME=
// DB_HOST=