import { AppError } from "./AppError";
export class ConflictError extends AppError{
    constructor(message:string,errors?:string|null){
        super(message,409,errors);
    }
}