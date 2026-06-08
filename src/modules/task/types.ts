export interface taskData {
  date:Date;
  workout:boolean;
  dsaq:number;
  platform:string | null;
  project?:string | null;
  commits:number;
  description?:string |null;
  other1?:string | null;
  other2?:string |null;
}
// taskData.date,
//         userId,
//         taskData.workout,
//         taskData.commits,
//         taskData.dsaq,
//         taskData.platform,
//         taskData.project,
//         taskData.description,
//         taskData.other1,
//         taskData.other2