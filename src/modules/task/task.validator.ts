import { z } from "zod";

export const taskValidatorSchema = z.object({
    date: z.coerce.date({ message: "Invalid ISO date format" }),
        
    workout: z.boolean()
        .default(true),
        
    commits: z.preprocess(
        (val) => (val === "" || val === undefined || val === null ? 0 : Number(val)),
        z.coerce.number().int().min(0, "Commits cannot be negative").default(0)
    ),
    
    platform: z.union([
        z.literal("cf"), 
        z.literal("lc"), 
        z.literal("")
    ]).nullable().optional().default(""),
    
    dsaq: z.preprocess(
        (val) => (val === "" || val === undefined || val === null ? 0 : Number(val)),
        z.coerce.number().int().min(0, "dsaq cannot be negative").default(0)
    ),
    
    project: z.string().trim().max(255).transform(val => val || null).nullable().optional(),
    description: z.string().trim().transform(val => val || null).nullable().optional(),
    other1: z.string().trim().max(255).transform(val => val || null).nullable().optional(),
    other2: z.string().trim().max(255).transform(val => val || null).nullable().optional(),
});

export const getTaskValidatorSchema = z.object({
    date:z.coerce.date()
    // .date({message:"Invalid date ISO"})
})

const MAX_LIMIT = 10;
const MIN_LIMIT = 5;

export const queryValidationSchema = z.object({
    fromDate:z.iso.datetime().optional().transform((val)=>(val ? new Date(val) :undefined)),
    toDate:z.iso.datetime().optional().transform((val)=>(val?new Date(val):undefined)),
    userIds:z.array(z.string().trim().max(100)).optional().transform((val )=>val && val.length>0 ?val:undefined),
    limit:z.coerce.number().catch(MIN_LIMIT).transform((val)=>{
        if(val>MAX_LIMIT)return MAX_LIMIT;
        if(val<MIN_LIMIT)return MIN_LIMIT;
    }),
    cursor:z.string().trim().nullish(),
    direction:z.enum(['next','prev']).default('next').nullish(),

});
export type QueryParams = z.infer<typeof queryValidationSchema>