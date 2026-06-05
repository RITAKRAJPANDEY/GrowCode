import { z } from "zod";

export const taskValidatorSchema = z.object({
    date: z.string()
        .datetime({ message: "Invalid ISO date format" }),
        
    workout: z.boolean()
        .default(true),
        
    commits: z.preprocess(
        (val) => (val === "" || val === undefined || val === null ? 0 : Number(val)),
        z.number().int().min(0, "Commits cannot be negative").default(0)
    ),
    
    platform: z.union([
        z.literal("cf"), 
        z.literal("lc"), 
        z.literal("")
    ]).nullable().optional().default(""),
    
    dsaq: z.preprocess(
        (val) => (val === "" || val === undefined || val === null ? 0 : Number(val)),
        z.number().int().min(0, "dsaq cannot be negative").default(0)
    ),
    
    project: z.string().trim().max(255).transform(val => val || null).nullable().optional(),
    description: z.string().trim().transform(val => val || null).nullable().optional(),
    other1: z.string().trim().max(255).transform(val => val || null).nullable().optional(),
    other2: z.string().trim().max(255).transform(val => val || null).nullable().optional(),
});

export const getTaskValidatorSchema = z.object({
    
})