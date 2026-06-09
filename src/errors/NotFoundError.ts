import { AppError } from "./AppError";
export class NotFoundError extends AppError{
    constructor(message:string,errors:string|null){
        super(message,404,errors);
    }
}