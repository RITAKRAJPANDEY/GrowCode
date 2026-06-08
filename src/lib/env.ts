import z from "zod";

export const validateEnvSchema = z.object({
    NODE_ENV:z.enum(['production','test','development']).default('development'),
    
});