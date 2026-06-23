import {z} from 'zod';

export const createChatSchema= z.object({
    targetUsername:z.string().min(1,{message:"please enter username"})
});

export type CreateChat=z.infer<typeof createChatSchema>