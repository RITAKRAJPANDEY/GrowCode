import { NextRequest, NextResponse } from "next/server";
import { addTaskController, allTaskDataController } from "../../../modules/task/task.controller"
interface QueryParams {
    fromDate?: string | null;
    toDate?: string | null;
    userIds?: string[];
}
export const POST = async (req: NextRequest): Promise<NextResponse> => {
    return await addTaskController(req);
}
export const GET = async (req: NextRequest): Promise<NextResponse> => {
    const { searchParams } = req.nextUrl;
    const fromDate = searchParams.get('from');
    const toDate = searchParams.get('to');
    const userIds = searchParams.getAll('user_id');
    const queryParams: QueryParams = {
        fromDate: fromDate,
        toDate: toDate,
        userIds: userIds
    }
    return allTaskDataController(req, queryParams)
}