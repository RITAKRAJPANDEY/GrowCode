import { BadRequestError } from "@/src/errors/BadRequestError";
import {z} from "zod";

export const signUpSchema=z.object({
    username:z.string()
    .min(3,{message:"username must contain atleast 3 characters"})
    .max(20,{message:"username can not be longer than 20 characters"})
    .trim() ,
    email:z.string()
    .toLowerCase()
    .trim()
    .email({message:"Invalid email address format"}),
    password:z.string()
    .min(8,{message:"minimum length 8 characters"}),
    role:z.enum(['user','admin']).default('user'),

});
export const logInSchema=z.object({
    username:z.string()
    .min(3,{message:"username must contain atleast 3 characters"})
    .max(20,{message:"username can not be longer than 20 characters"})
    .trim(),
    password:z.string()
    .min(8,{message:"minimum length 8 characters"}),
    role:z.enum(['user','admin']).default('user'),
});
export const refreshTokenSchema=z.object({
    refreshToken:z.string({message:"Refresh Token Must Be a String"})
    .trim()
    .min(1,{message:"Refresh Token can't be empty"})
    .max(2048,{message:"Too long for refreshtoken"})
});


export type signUpInput = z.infer<typeof signUpSchema>;
export type logInInput = z.infer<typeof logInSchema>;
export type refreshTokenInput = z.infer <typeof refreshTokenSchema>;