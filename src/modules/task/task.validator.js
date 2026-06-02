import {z} from "zod";
//  const Task = {
//             date: date ? date : new Date().toISOString(),
//             workout: workout,
//             commits: commits ? Number(commits) : 0,
//             dsa: {
//                 platform: platform,
//                 dsaq: dsaq ? Number(dsaq) : 0,
//             },
//             project: project,
//             description: description,
//             other1: other1,
//             other2: other2
//         }
export const taskValidatorSchema = z.object({
    date:z.string()
    .datetime({message:"Invalid ISO date format"}),
    workout:z.boolean()
    .default(true),
    commits:z.preprocess(
        (val)=>(val===""?0:Number(val)),
        z.number().int().min(0,"Commits cannot be negative").default(0)
    ),
    dsaq:z.object({
        platform:z.union([z.literal("cf"),z.literal("lc"),z.literal("")]).nullable().optional(),
        dsaq:z.preprocess(
            (val)=>(val===""?0:Number(val)),
            z.number().int().min(0,"dsaq cannot be negative").default(0)
        ),
    }),
    project:z.string().trim().max(255).transform(val=>val||null).nullable().optional(),
    description: z.string().trim().transform(val => val || null).nullable().optional(),
    other1: z.string().trim().max(255).transform(val => val || null).nullable().optional(),
    other2: z.string().trim().max(255).transform(val => val || null).nullable().optional(),
});